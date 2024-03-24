import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DoctorService } from 'src/app/services/doctorService/doctor.service';

@Component({
  selector: 'app-registered-doctors',
  templateUrl: './registered-doctors.component.html',
  styleUrls: ['./registered-doctors.component.css']
})
export class RegisteredDoctorsComponent {
  data!:any;
  columns:string[] = ['name', 'age', 'specialization', 'license', 'experience','Actions'];
  route:string = 'Listing';

  constructor(private doctorService: DoctorService, private router: Router) {}

  ngOnInit () {
    const token= localStorage.getItem('jwtToken');
    if(token){
      this.doctorService.getDoctors().subscribe((data) => {
        console.log('Med data:', data.doctors);
        this.data = data.doctors;
      });
    }
  }

  blockUnblock(email: string) {
    // this.doctorService.blockDoctor(email).subscribe((data) => {
    //   console.log(data.message);
    // });
  }
}
