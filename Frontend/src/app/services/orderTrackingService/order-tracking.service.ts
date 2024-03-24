import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Socket, io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class OrderTrackingService {

  socket: Socket;

  constructor() {
    console.log("inied constrcut socket");
    console.dir( io );
    this.socket = io('http://localhost:3002');
   }

  getDeliveryExecutiveLocation(medId:string): any {
    this.socket.emit('medId', { medId: medId });
    return new Observable((observer) => {
      this.socket.on('locationUpdate', (location: any) => {
        observer.next(location);
      });
    });
  }

  disconnect() {
    this.socket.disconnect();
  }

}
