import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Subscription } from 'rxjs';
import { MedicalStoreService } from 'src/app/services/medical-service/medical-store.service';

@Component({
  selector: 'app-medical-store-order-management',
  templateUrl: './medical-store-order-management.component.html',
  styleUrls: ['./medical-store-order-management.component.css']
})
export class MedicalStoreOrderManagementComponent {

  medId: string = '';
  decodedtoken!: any;
  data!: any;
  columns: string[] = ['orderId', 'orderStatus', 'paymentStatus', 'orderDate', 'orderTotal', 'Actions'];
  route: string = 'orderListing';
  private subscriptions: Subscription[] = [];

  constructor(private medicalService: MedicalStoreService, private router: Router, private datePipe: DatePipe) { }

  ngOnInit() {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      this.decodedtoken = jwtDecode(token);
      this.medId = this.decodedtoken.id;

      const orderSubscription = this.medicalService.getOrders(this.medId).subscribe((data) => {
        console.log('Med data:', data.orders);
        this.data = data.orders.map((order: any) => ({
          ...order,
          orderDate: this.formatDate(order.orderDate)
        }));
      });

      this.subscriptions.push(orderSubscription);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  formatDate(date: string): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd') || '';
  }

  orderDetails(orderId:string){
    this.router.navigate(['medicalstore-orderdetails'], { queryParams: { orderId: orderId } });
  }

}
