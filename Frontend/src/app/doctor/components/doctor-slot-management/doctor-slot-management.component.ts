import { Component } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { DoctorService } from 'src/app/services/doctorService/doctor.service';

@Component({
  selector: 'app-doctor-slot-management',
  templateUrl: './doctor-slot-management.component.html',
  styleUrls: ['./doctor-slot-management.component.css']
})
export class DoctorSlotManagementComponent {
  selectedDays: string[] = [];
  startTime: string = '';
  endTime: string = '';
  slotDuration: number = 30;
  slots: any[] = [];
  slotsForSelectedDay:any[] = [];
  selectedDate!: Date | null;
  decodedtoken!:any;
  doctorId!:string;
  name!:string;
  existingSlots: any[] = [];

  constructor(private doctorService: DoctorService) {}

  ngOnInit(): void {
    const token= localStorage.getItem('jwtToken');
    if(token){
      this.decodedtoken= jwtDecode(token);
      this.name=this.decodedtoken.name;
      this.doctorId=this.decodedtoken.id;
    }
    this.fetchExistingSlots();
  }


  fetchExistingSlots() {
    this.doctorService.getDoctorSlots(this.doctorId).subscribe({
      next: (slots: any[]) => {
        this.existingSlots = slots;
        console.log("exs",this.existingSlots);
        
      },
      error: (error:any) => console.error(error)
    });
  }

  generateAppointmentSlots() {
    console.log("days", this.selectedDays);
    
    this.slots = this.computeSlots(
      this.selectedDays,
      this.startTime,
      this.endTime,
      this.slotDuration
    );

    this.clearFields();

    console.log(this.slots);
    this.doctorService.addDoctorSlot(this.doctorId,this.slots).subscribe((data)=>{
      console.log(data.message);
      this.fetchExistingSlots();
    })
  }

  computeSlots(daysOfWeek: string[], startTime: string, endTime: string, slotDuration: number): any[] {
    const slots:any = [];
  
    daysOfWeek.forEach(day => {
      let currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);
  
      while (currentDate.getDay() !== this.getDayNumber(day)) {
        currentDate.setDate(currentDate.getDate() + 1);
      }
  
      const startDate = new Date(currentDate);
      const endDate = new Date(currentDate);
  
      startDate.setHours(this.getHoursFromTime(startTime), this.getMinutesFromTime(startTime));
      endDate.setHours(this.getHoursFromTime(endTime), this.getMinutesFromTime(endTime));
  
      const skipStartTime = new Date(startDate);
      skipStartTime.setHours(13, 0, 0);
      const skipEndTime = new Date(skipStartTime);
      skipEndTime.setHours(14, 0, 0);
  
      while (startDate.getTime() < endDate.getTime()) {
        if (startDate.getTime() < skipStartTime.getTime() || startDate.getTime() >= skipEndTime.getTime()) {
          const slot = {
            startTime: new Date(startDate),
            endTime: new Date(startDate.getTime() + slotDuration * 60000),
          };
  
          slots.push(slot);
        }

        startDate.setTime(startDate.getTime() + (slotDuration + 15) * 60000);
      }
    });
  
    return slots;
  }
  

  private getDayNumber(day: string): number {
    const dayMapping:any = {
      'Sun': 0,
      'Mon': 1,
      'Tue': 2,
      'Wed': 3,
      'Thu': 4,
      'Fri': 5,
      'Sat': 6,
    };
    return dayMapping[day];
  }

  private getHoursFromTime(time: string): number {
    return parseInt(time.split(':')[0], 10);
  }

  private getMinutesFromTime(time: string): number {
    return parseInt(time.split(':')[1], 10);
  }

  clearFields() {
    this.selectedDays = [];
    this.startTime = '';
    this.endTime = '';
    this.slotDuration = 30;
  }

  showSlotsForDay(selectedDate: Date) {
    this.selectedDate = selectedDate;
    this.slotsForSelectedDay = this.existingSlots.filter(slot => {
      const slotDate = new Date(slot.startTime);
      return slotDate.toDateString() === selectedDate.toDateString();
    });
  }
  
  
}
