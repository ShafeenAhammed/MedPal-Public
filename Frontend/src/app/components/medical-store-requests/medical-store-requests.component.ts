import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { RoutingService } from 'src/app/services/user-service/routing.service';

@Component({
  selector: 'app-medical-store-requests',
  templateUrl: './medical-store-requests.component.html',
  styleUrls: ['./medical-store-requests.component.css']
})
export class MedicalStoreRequestsComponent {

  data!:any;
  // data$!: Observable<any>;

  columns:string[] = ['storeName', 'ownerName', 'email', 'license', 'licenseFile','mobile','Actions'];
  route:string = 'Requests';

  constructor(private routeService: RoutingService, private router: Router) {}

  ngOnInit () {
    const token= localStorage.getItem('jwtToken');
    if(token){
      this.routeService.medicalStoreRequests().subscribe((data) => {
        console.log('User data:', data.medRequests);
        this.data = data.medRequests;
      });
      // this.data$ = this.routeService.medicalStoreRequests().pipe(map(data => data.medRequests));
    }
  }

  medStoreReqDecision(email: string, applicationStatus: string) {
    console.log('Handling button 1 click in parent for email:', email);
    this.routeService.medicalStoreRequestDecision(email,applicationStatus).subscribe((response)=>{
      console.log(response);
      this.routeService.medicalStoreRequests().subscribe((data) => {
        console.log('User data:', data.medRequests);
        this.data = data.medRequests;
      });
    });
    // this.router.navigateByUrl('/medicalstore-requests');

  }

  getLicenseFile(licenseFile:string) {
    this.routeService.getMedicalStoreLicense(licenseFile).subscribe(data => {
      const fileURL = URL.createObjectURL(data);
      window.open(fileURL, '_blank');
    });  
  }

}
