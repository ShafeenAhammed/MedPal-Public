import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { VideocallService } from 'src/app/services/VideoCallService/videocall.service';
import { SocketService } from 'src/app/services/socket/socket.service';

@Component({
  selector: 'app-user-video-call',
  templateUrl: './user-video-call.component.html',
  styleUrls: ['./user-video-call.component.css']
})
export class UserVideoCallComponent {
  localStream!: any;
  remoteStream!: any;
  appointmentId!:string;
  name!:string;
  
  @ViewChild('localVideo') localVideo!: ElementRef;
  @ViewChild('remoteVideo') remoteVideo!: ElementRef;

  isMicMuted = false;
  isCameraOn = true;
  
  constructor(private socketService: SocketService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(){

    this.route.queryParams.subscribe(params => {
      this.appointmentId = params['appoinmentId'];
      this.name = params['name'];
    })

    console.log(this.appointmentId,this.name);
    
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        this.localStream = stream;
        const localVideoElement = document.getElementById("localStream");

        if (localVideoElement instanceof HTMLVideoElement) {
          localVideoElement.srcObject = this.localStream;
          this.socketService.handleAddtrack(this.localStream);
        } else {
          console.error("Local video element not found or is not an HTMLVideoElement.");
        }
      })
      .catch((error) => {
        console.error("Error accessing local media devices:", error);
    });
    console.log("joining");
    
    this.socketService.joinRoom(this.appointmentId,this.name);
    // this.socketService.createOffer();

    // this.socketService.handleAddtrack(this.localStream);

    this.socketService.remoteStream$.pipe().subscribe((remoteStream) => {
      this.remoteStream = remoteStream;
      const remoteVideoElement = document.getElementById("remoteStream") as HTMLVideoElement;
  
      if (remoteVideoElement instanceof HTMLVideoElement) {
        console.log("remote vido coming");
        remoteVideoElement.srcObject = this.remoteStream;
      } else {
        console.error("Remote video element not found or is not an HTMLVideoElement.");
      }
    });
  }

  toggleMic() {
    this.isMicMuted = !this.isMicMuted;
    const localStream = this.localVideo.nativeElement.srcObject as MediaStream;
    localStream.getAudioTracks().forEach(track => {
      track.enabled = !this.isMicMuted;
    });
  }


  toggleCamera() {
    this.isCameraOn = !this.isCameraOn;
    const localStream = this.localVideo.nativeElement.srcObject as MediaStream;
    localStream.getVideoTracks().forEach(track => {
      track.enabled = this.isCameraOn;
    });
  }
  
  endCall() {
    console.log("ENding call");
    this.stopMediaStream(this.localStream);
    this.stopMediaStream(this.remoteStream);
    this.socketService.disconnect();
    this.router.navigate(['/user-dashboard/appointments']);
  }

  stopMediaStream(stream: MediaStream | undefined) {
      if (stream) {
          stream.getTracks().forEach(track => {
              track.stop();
          });
      }
  }

}
