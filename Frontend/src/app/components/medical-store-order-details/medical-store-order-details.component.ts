import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicalStoreService } from 'src/app/services/medical-service/medical-store.service';
import { RoutingService } from 'src/app/services/user-service/routing.service';

@Component({
  selector: 'app-medical-store-order-details',
  templateUrl: './medical-store-order-details.component.html',
  styleUrls: ['./medical-store-order-details.component.css']
})
export class MedicalStoreOrderDetailsComponent {

  orderId!:string;
  orderStatus!:string;
  orderDetails: any;
  

  constructor(private medcicalService: MedicalStoreService, private router: Router, private route: ActivatedRoute, private userService: RoutingService) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.orderId = params['orderId'];
    });

    this.medcicalService.getOrderDetails(this.orderId).subscribe((data)=>{
      if(data) {
        this.orderStatus = data.order.orderStatus;
        this.orderDetails = data.order;

      }
    })
  }

  updateOrderStatus(orderStatus:string) {
    console.log("updated ordes0",orderStatus);
    this.medcicalService.updateOrderStatus(this.orderId,orderStatus).subscribe((res)=>{
      if(res){
        if(res.success){
          this.medcicalService.getOrderDetails(this.orderId).subscribe((data)=>{
            if(data) {
              this.orderStatus = data.order.orderStatus;
              this.orderDetails = data.order;
            }
          })
        }
      }
    })
  }
}
