import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { DoctorService } from 'src/app/services/doctorService/doctor.service';
import { MedicalStoreService } from 'src/app/services/medical-service/medical-store.service';
import { RoutingService } from 'src/app/services/user-service/routing.service';

@Component({
  selector: 'app-user-appoinments',
  templateUrl: './user-appoinments.component.html',
  styleUrls: ['./user-appoinments.component.css']
})
export class UserAppoinmentsComponent {
  decodedToken!:any;
  customerId!:string;
  appoinments!:any;
  constructor(private router: Router, private userService: RoutingService, private medicalService:MedicalStoreService, private doctorService: DoctorService) {}

  ngOnInit() {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      this.decodedToken = jwtDecode(token);
      this.customerId = this.decodedToken.id;
      
      this.doctorService.getCustomerAppoinments(this.customerId).subscribe((data)=>{
        if(data){
          console.log("data",data.appoinments);
          this.appoinments = data.appoinments;
          // this.appoinments = data.appoinments.map((app: any) => ({ ...app, showDetails: false }));
        }
      })
    }
  }

  toggleOrderDetails(app: any) {
    app.showDetails = !app.showDetails;
  }

  isCallTime(appointment: any): boolean {
    if (!appointment) return false;
    const currentTime = new Date();
    const startTime = new Date(appointment.timeSlot.startTime);
    const endTime = new Date(appointment.timeSlot.endTime);
    return currentTime >= startTime && currentTime < endTime;
  }

  isCallEndTime(appointment: any): boolean {
    if (!appointment) return false;
    const currentTime = new Date();
    const endTime = new Date(appointment.timeSlot.endTime);
    return currentTime > endTime;
  }

  completeAppointment (appointmentId: string) {
    console.log("compliiii", appointmentId);
    
    this.doctorService.completeAppointment(appointmentId).subscribe((data)=>{
      if(data.success){
        this.doctorService.getCustomerAppoinments(this.customerId).subscribe((data)=>{
          if(data){
            console.log("data",data.appoinments);
            this.appoinments = data.appoinments;
          }
        })
      }
    })
  }

}
