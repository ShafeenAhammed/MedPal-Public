import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket;
  private remoteId!:string;

  private remoteStreamSubject = new Subject<MediaStream>();
  remoteStream$ = this.remoteStreamSubject.asObservable();

  peer = new RTCPeerConnection({
    iceServers: [
      {
        urls: [
          "stun:stun.l.google.com:19302",
          "stun:global.stun.twilio.com:3478",
        ],
      },
    ],
  });

  constructor() {
    this.socket = io('http://localhost:3003');
    this.handleUserJoined();
    this.handleOffer();
    this.handleAnswer();
    this.handleRemoteStream();
    this.peerNegotiantionNeeded();
    this.peerNegoIncoming();
    this.peerNegoFinal();
    
  }

  joinRoom(room:string, role:string) {
    const data = {room, role}
    this.socket.emit('join room', data);
  }

  handleUserJoined() {
    this.socket.on('user joined',(data)=>{
      console.log('User joined:', data.role, data.id); 
      this.remoteId = data.id;
      this.createOffer(data.id);
    }) 
  }
  

  createOffer(id:string) {
    this.peer.createOffer()
   .then(offer => {
      this.peer.setLocalDescription(offer);
      this.socket.emit('offer', {id:id,offer});
      // this.handleOffer();
   })
   .catch(error => {
      console.error('Error creating offer:', error);
   });
  }

  handleOffer() {
    // this.socket.on('participants',(par)=>{
    //   console.log("parttt",par);
    // })
    console.log("inside handling offer");
    
    this.socket.on('offer',(data)=>{
      console.log("offerr",data.offer,"from",data.id);
      this.remoteId = data.id;
      this.peer.setRemoteDescription(data.offer).then(()=>{
        return this.peer.createAnswer()
      }).then( answer =>{
        this.peer.setLocalDescription(answer)
        console.log("answer",data.id,answer);
        this.socket.emit('answer', {id:data.id,answer:answer});
        this.handleAnswer();
      }).catch(err =>{
        console.log("Error in generating answer",err);
      })
    })
  } 

  handleAnswer() {
    this.socket.on('answer', (answer) => {
      console.log("Handling answer:", answer);
      this.peer.setRemoteDescription(answer) 
        .then(() => {
          console.log("Remote description set successfully.");
        })
        .catch((err) => {
          console.log("Error in setting remote description:", err);
        }); 
    });
  }


 handleAddtrack(localStream: MediaStream) {
  localStream.getTracks().forEach(track => this.peer.addTrack(track, localStream));
  // navigator.mediaDevices
  // .getUserMedia({ video: true, audio: true })
  // .then(stream => {
  //     stream.getTracks().forEach(track => this.peer.addTrack(track, stream));
  // })
 }

 private handleRemoteStream() {
  this.peer.ontrack = (event) => {
    const remoteStream = event.streams[0]; 
    this.remoteStreamSubject.next(remoteStream);
  };
}

  private peerNegotiantionNeeded() {
    this.peer.addEventListener('negotiationneeded', async (ev) => {
    this.peer.createOffer()
   .then(offer => {
      this.peer.setLocalDescription(offer);
      this.socket.emit('peer-nego-needed', {id:this.remoteId,offer});
      // this.handleOffer();
   })
   .catch(error => {
      console.error('Error creating offer:', error);
   });
    });
  }

  private peerNegoIncoming() {
    const arr = this.peer.getSenders()
    console.log("rtc senderes", arr);
    this.socket.on('peer-nego-needed',(data)=>{
      this.peer.setRemoteDescription(data.offer).then(()=>{
        return this.peer.createAnswer()
      }).then( answer =>{
        this.peer.setLocalDescription(answer)
        console.log("peer nego answer",data.id,answer);
        this.socket.emit('peer-nego-done', {id:data.id,answer:answer});
        // this.handleAnswer();
      }).catch(err =>{
        console.log("Error in generating answer",err);
      })
    }) 
  }

   peerNegoFinal(){
    this.socket.on('peer-nego-final', (data)=>{
      console.log("Handling peer nego final:", data.answer);
      this.peer.setRemoteDescription(data.answer) 
        .then(() => {
          console.log("Peer Nego final successfully.");
        })
        .catch((err) => {
          console.log("Error in Peer nego final:", err);
        }); 
    })
    
  }
  
  disconnect() {
    this.socket.disconnect();
  }
}