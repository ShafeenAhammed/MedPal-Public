import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MedicalStoreService } from 'src/app/services/medical-service/medical-store.service';
import { OrderTrackingService } from 'src/app/services/orderTrackingService/order-tracking.service';

@Component({
  selector: 'app-order-tracking',
  templateUrl: './order-tracking.component.html',
  styleUrls: ['./order-tracking.component.css']
})
export class OrderTrackingComponent {
  @ViewChild('map') mapElement!: ElementRef;
  markerPosition: google.maps.LatLngLiteral = { lat: 0, lng: 0 };
  // center = { lat: -34.397, lng: 150.644 };
  zoom = 12;
  // results!: string[];
  orderId!:string;
  medId!:string;
  order!:any;
  delExecLoc!:{lat:number, lng:number};
  delAddressLoc!:{lat:number, lng:number};
  private subscriptions: Subscription[] = [];

  constructor(private orderTrackingService: OrderTrackingService, private medicalService: MedicalStoreService, private route: ActivatedRoute, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.subscriptions.push(
      this.route.queryParams.subscribe((params) => {
        this.orderId = params['orderId'];
        this.medId = params['medId'];
      })
    );

    this.subscriptions.push(
      this.medicalService.getOrderDetails(this.orderId).subscribe((data) => {
        console.log("order details", data.order);
        this.order = data.order;
        this.delAddressLoc = { lat: data.order.deliveryAddress.latitude, lng: data.order.deliveryAddress.longitude };
      })
    );

    this.subscriptions.push(
      this.orderTrackingService.getDeliveryExecutiveLocation(this.medId).subscribe((location: any) => {
        console.log('Received location update:', location);
        this.delExecLoc = { lat: location.latitude, lng: location.longitude };
        console.log("update aayo", this.delExecLoc);
        this.cdr.detectChanges();
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    this.orderTrackingService.disconnect();
  }
  
  reverseGeocode(lat:number, lng:number) {
    return new Promise((resolve, reject) => {
      const geocoder = new google.maps.Geocoder();
  
      geocoder.geocode({ location: { lat, lng } }, (results, status) => {
        if (status === 'OK') {
          resolve(results![0].formatted_address);
        } else {
          reject(new Error(`Reverse geocode was not successful for the following reason: ${status}`));
        }
      });
    });
  }
}
