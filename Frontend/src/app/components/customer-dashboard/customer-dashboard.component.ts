import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { MedicalStoreService } from 'src/app/services/medical-service/medical-store.service';
import { RoutingService } from 'src/app/services/user-service/routing.service';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css']
})
export class CustomerDashboardComponent {
  
  decodedToken!:any;
  customerId!:string;

  constructor(private router: Router, private userService: RoutingService, private medicalService:MedicalStoreService) {}

  ngOnInit() {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      this.decodedToken = jwtDecode(token);
      this.customerId = this.decodedToken.id;
      
      this.userService.getCustomerDetails(this.customerId).subscribe((data)=>{
        
      })
    }
  }
}
