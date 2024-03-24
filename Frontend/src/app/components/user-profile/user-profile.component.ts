import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { MedicalStoreService } from 'src/app/services/medical-service/medical-store.service';
import { RoutingService } from 'src/app/services/user-service/routing.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  decodedToken!:any;
  customerId!:string;
  customer!:any;

  constructor(private router: Router, private userService: RoutingService, private medicalService:MedicalStoreService) {}

  ngOnInit() {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      this.decodedToken = jwtDecode(token);
      this.customerId = this.decodedToken.id;
      
      this.userService.getCustomerDetails(this.customerId).subscribe((data)=>{
        if(data){
          console.log("data",data);
          this.customer = data.customer;
        }
      })
    }
  }
}
