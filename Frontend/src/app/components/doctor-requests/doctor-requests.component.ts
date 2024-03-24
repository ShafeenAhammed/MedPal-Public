import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RoutingService } from 'src/app/services/user-service/routing.service';

@Component({
  selector: 'app-doctor-requests',
  templateUrl: './doctor-requests.component.html',
  styleUrls: ['./doctor-requests.component.css']
})
export class DoctorRequestsComponent {
  data!:any;
  // data$!: Observable<any>;

  columns:string[] = ['name', 'email', 'mobile', 'experience', 'specialization', 'currentHospital', 'licenseFile','Actions'];
  route:string = 'Requests';

  constructor(private routeService: RoutingService, private router: Router) {}

  ngOnInit () {
    const token= localStorage.getItem('jwtToken');
    if(token){
      this.routeService.doctorRequests().subscribe((data) => {
        console.log('User data:', data.docRequests);
        this.data = data.docRequests;
      });
      // this.data$ = this.routeService.medicalStoreRequests().pipe(map(data => data.medRequests));
    }
  }

  doctorReqDecision(email: string, applicationStatus: string) {
    console.log('Handling button 1 click in parent for email:', email);
    this.routeService.doctorRequestDecision(email,applicationStatus).subscribe((response)=>{
      console.log(response);
      this.routeService.doctorRequests().subscribe((data) => {
        console.log('User data:', data.docRequests);
        this.data = data.docRequests;
      });
    });
    // this.router.navigateByUrl('/medicalstore-requests');

  }

  getLicenseFile(licenseFile:string) {
    this.routeService.getDoctorLicense(licenseFile).subscribe(data => {
      const fileURL = URL.createObjectURL(data);
      window.open(fileURL, '_blank');
    });  
  }
}
