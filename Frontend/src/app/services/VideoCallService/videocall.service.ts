import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VideocallService {
  peerConnection: RTCPeerConnection | null = null;

  constructor() {
    if (!this.peerConnection) {
      this.peerConnection = new RTCPeerConnection({
        iceServers: [
          { urls: ['stun:stun.l.google.com:19302'] },
          { urls: ['stun:global.stun.twilio.com:3478'] }
        ]
      });
    }
  }

  async getAnswer(offer: RTCSessionDescriptionInit): Promise<any> {
    if (this.peerConnection) {
      await this.peerConnection.setRemoteDescription(offer);
      const answer = await this.peerConnection.createAnswer();
      await this.peerConnection.setLocalDescription(new RTCSessionDescription(answer));
      return answer;
    }
    throw new Error('PeerConnection not initialized');
  }

  async getOffer(): Promise<any> {
    if (this.peerConnection) {
      const offer = await this.peerConnection.createOffer();
      await this.peerConnection.setLocalDescription(new RTCSessionDescription(offer));
      return offer;
    }
    throw new Error('PeerConnection not initialized');
  }

  setLocalDescription(description: RTCSessionDescriptionInit) {
    if (this.peerConnection) {
      this.peerConnection.setLocalDescription(new RTCSessionDescription(description));
    }
  }

  setRemoteDescription(description: RTCSessionDescriptionInit) {
    if (this.peerConnection) {
      this.peerConnection.setRemoteDescription(new RTCSessionDescription(description));
    }
  }
}
