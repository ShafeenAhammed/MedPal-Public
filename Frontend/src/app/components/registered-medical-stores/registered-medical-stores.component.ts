import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RoutingService } from 'src/app/services/user-service/routing.service';

@Component({
  selector: 'app-registered-medical-stores',
  templateUrl: './registered-medical-stores.component.html',
  styleUrls: ['./registered-medical-stores.component.css']
})
export class RegisteredMedicalStoresComponent {
  data!:any;
  columns:string[] = ['storeName', 'ownerName', 'email', 'license', 'mobile','Actions'];
  route:string = 'Listing';

  constructor(private routeService: RoutingService, private router: Router) {}

  ngOnInit () {
    const token= localStorage.getItem('jwtToken');
    if(token){
      this.routeService.getMedicalStores().subscribe((data) => {
        console.log('Med data:', data.meds);
        this.data = data.meds;
      });
    }
  }

  blockUnblock(email: string) {
    this.routeService.blockMedicalStore(email).subscribe((data) => {
      console.log(data.message);
    });
  }
}
