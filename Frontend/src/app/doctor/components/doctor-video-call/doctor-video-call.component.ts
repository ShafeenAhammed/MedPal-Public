import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { VideocallService } from 'src/app/services/VideoCallService/videocall.service';
import { SocketService } from 'src/app/services/socket/socket.service';

@Component({
  selector: 'app-doctor-video-call',
  templateUrl: './doctor-video-call.component.html',
  styleUrls: ['./doctor-video-call.component.css']
})
export class DoctorVideoCallComponent {

  localStream!: any;
  remoteStream!: any;
  appointmentId!:string;
  name!:string;
  
  @ViewChild('localVideo') localVideo!: ElementRef;
  @ViewChild('remoteVideo') remoteVideo!: ElementRef;

  isMicMuted = false;
  isCameraOn = true;

  constructor(private socketService: SocketService, private route: ActivatedRoute) { }

  ngAfterViewInit(){
    this.route.queryParams.subscribe(params => {
      this.appointmentId = params['appoinmentId'];
      this.name = params['name'];
    })

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

    this.socketService.joinRoom(this.appointmentId,this.name);
    // this.socketService.createOffer();
    

    this.socketService.remoteStream$
    .pipe()
    .subscribe((remoteStream) => {
      this.remoteStream = remoteStream;
      const remoteVideoElement = document.getElementById("remoteStream") as HTMLVideoElement;
      
      if (remoteVideoElement) {
        remoteVideoElement.srcObject = remoteStream;
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

  }
}
