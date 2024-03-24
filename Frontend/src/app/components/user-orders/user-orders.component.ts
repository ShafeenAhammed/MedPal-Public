import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { MedicalStoreService } from 'src/app/services/medical-service/medical-store.service';
import { RoutingService } from 'src/app/services/user-service/routing.service';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent {
  decodedToken!:any;
  customerId!:string;
  orders!:any;
  constructor(private router: Router, private userService: RoutingService, private medicalService:MedicalStoreService) {}

  ngOnInit() {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      this.decodedToken = jwtDecode(token);
      this.customerId = this.decodedToken.id;
      
      this.medicalService.getCustomerOrders(this.customerId).subscribe((data)=>{
        if(data){
          console.log("data",data.orders);
          this.orders = data.orders;
          this.orders = data.orders.map((order: any) => ({ ...order, showDetails: false }));
        }
      })
    }
  }

  toggleOrderDetails(order: any) {
    order.showDetails = !order.showDetails;
  }


}
