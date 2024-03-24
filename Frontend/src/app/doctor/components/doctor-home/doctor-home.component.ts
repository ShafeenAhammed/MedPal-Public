import { Component } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { DoctorService } from 'src/app/services/doctorService/doctor.service';

@Component({
  selector: 'app-doctor-home',
  templateUrl: './doctor-home.component.html',
  styleUrls: ['./doctor-home.component.css']
})
export class DoctorHomeComponent {

  decodedtoken!:any;
  name!:string;
  doctorId!:string;
  doctorDetails!:any;
  appointments!:any;
  totalAppointments!:any;
  upcomingAppointment!:any;
  currentAppointment!: any;

  constructor(private doctorService: DoctorService) { }

  ngOnInit(): void {
    const token= localStorage.getItem('jwtToken');
    if(token){
      this.decodedtoken= jwtDecode(token);
      this.name=this.decodedtoken.name;
      this.doctorId=this.decodedtoken.id;
    }

    this.loadDoctorDetails();
    this.getAppointments();
  }

  loadDoctorDetails() {
    this.doctorService.getDoctorById(this.doctorId).subscribe((data) => {
      this.doctorDetails = data.doctor;
      console.log("docs",this.doctorDetails);
      this.fetchDocImage();
    });
  }

  fetchDocImage() {
    this.doctorService.getDocImage(this.doctorDetails.doctorImage).subscribe((data)=>{
      const reader = new FileReader();
      reader.onloadend = () => {
        this.doctorDetails.doctorImage = reader.result as string;
      };
      reader.readAsDataURL(data);
    })
  }

  getAppointments() {
    this.doctorService.getDocAppoinments(this.doctorId).subscribe((data) => {
      this.appointments = data.appoinments;
      console.log("appoin", this.appointments);

      this.totalAppointments = data.appoinments.length;

      const currentTime = new Date();
      this.upcomingAppointment = null;
      this.currentAppointment = null;
      for (const appointment of this.appointments) {
        console.log("time slot", appointment.timeSlot);

        const startTime = new Date(appointment.timeSlot.startTime);
        const endTime = new Date(appointment.timeSlot.endTime);
        if (startTime <= currentTime && endTime > currentTime) {
          this.currentAppointment = appointment;
          console.log("currentg",this.currentAppointment);
          
        } else if (startTime > currentTime && (this.upcomingAppointment === null || startTime < new Date(this.upcomingAppointment.timeSlot.startTime))) {
          this.upcomingAppointment = appointment;
        }
      }

    })
  }

  isCallTime(appointment: any): boolean {
    if (!appointment) return false;
    const currentTime = new Date();
    const startTime = new Date(appointment.timeSlot.startTime);
    const endTime = new Date(appointment.timeSlot.endTime);
    return currentTime >= startTime && currentTime < endTime;
  }

}
