import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { MedicalStoreService } from 'src/app/services/medical-service/medical-store.service';
import { RazorpayService } from 'src/app/services/razorpay/razorpay.service';
import { SharedDataService } from 'src/app/services/shared-data/shared-data.service';
import { RoutingService } from 'src/app/services/user-service/routing.service';
// import { getMessaging, getToken, onMessage } from "firebase/messaging";
// import { environment } from 'src/environments/environment';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { SwPush } from '@angular/service-worker';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartProducts: any[] = [];
  customerId!:string;
  customerName!:string;
  address!:any;
  userLocation!: { lat: number, lng: number };
  medId!:string;
  medName!:string;
  orderId!:string;

  constructor(private route: ActivatedRoute, private routingService: RoutingService, private router: Router, private medicalService: MedicalStoreService,private sharedDataService: SharedDataService, private razorpayService: RazorpayService, private afMessaging: AngularFireMessaging) {

   }

  ngOnInit() {
    const token = localStorage.getItem('jwtToken');
    if (token) {

      this.sharedDataService.currentMedId.subscribe((medId) => {
        this.medId = medId;
        console.log("medddd",medId);
        this.medicalService.getMedStoreDetails(medId).subscribe((res)=>{
          this.medName = res.med.storeName;
        })
      });

      const decodedToken: any = jwtDecode(token);
      const customerId = decodedToken.id;
      this.customerId = customerId;
      this.customerName = decodedToken.name;
      this.routingService.getCartProducts(customerId).subscribe((response) => {
        if (response.success) {
          this.cartProducts = response.cart;
        }
      });

      this.sharedDataService.selectedAddress$.subscribe((address) => {
        console.log("addrees",address);
        this.address = address;
        this.userLocation = {lat: address.latitude, lng: address.longitude};
      });

        this.afMessaging.requestPermission.subscribe(
          (response) => {
            if(response){
              console.log('Permission granted!',response);
              if(response === "granted"){
                this.afMessaging.getToken.subscribe(
                  (token) => {
                    if (token) {
                      console.log('FCM Token:', token);
                      this.routingService.addFcmToken(customerId,token).subscribe((response)=>{
                        if(response){
                          console.log(response);
                        }
                      })
                    } else {
                      console.log('FCM Token is null');
                    }
                  }
                  ,
                  (error) => {
                    console.error('Error retrieving FCM token:', error);
                  }
                );
              }
            }
          }
          ,
          (error) => {
            console.log('Permission denied:', error);
          }
        );

        this.afMessaging.messages.subscribe((message) => {
          console.log('Push Notification Received:', message);
          this.showNotification(message.data!['title'], { body: message.data!['body'] });
        });
    }
  }

  addToCart(product: any){
    this.routingService.addToCart(this.customerId,product.productId).subscribe((response)=>{
      console.log(response);
      this.routingService.getCartProducts(this.customerId).subscribe((response) => {
        if (response.success) {
          this.cartProducts = response.cart;
        }
      });
    })
  }

  removeFromCart(product: any){
    this.routingService.removeCart(this.customerId,product.productId).subscribe((response)=>{
      console.log(response);
      this.routingService.getCartProducts(this.customerId).subscribe((response) => {
        if (response.success) {
          this.cartProducts = response.cart;
        }
      });
    })
  }

  calculateSubtotal(){
    return this.cartProducts.reduce((subtotal, item) => subtotal + (item.price * item.productQuantity), 0);
  }

  makePayment(){

    this.medicalService.createOrder(this.customerId,this.customerName,this.medId,this.medName,this.cartProducts,this.address,this.calculateSubtotal()).subscribe((response)=>{
      if(response.success){
        this.orderId = response.order.orderId
        this.openRazorpay(response.order_id)
      }
    })
  }

  openRazorpay(order_id:string) {
    const options = {
      key: environment.RAZORPAY_ID_KEY, 
      amount: this.calculateSubtotal() * 100, 
      currency: 'INR', 
      name: 'MedPal',
      description: 'Payment for Medicines',
      order_id: order_id,
      handler: (response: any) => {
        this.handlePayment(response);
      }, 
      prefill: {
        name: 'Customer Name',
        email: 'customer@example.com',
        contact: '1234567890',
      },
      // notes: {
      //   address: 'Your Address',
      // },
      theme: {
        color: '#F37254',
      },
    };

    this.razorpayService.open(options);
  }


  handlePayment(response: any) {
    if (response.razorpay_payment_id) {
      console.log("Payment successful");
      console.log("Payment ID:", response.razorpay_payment_id);
      console.log("Order ID:", response.razorpay_order_id);
      this.medicalService.updateOrder(this.customerId,this.medId,this.orderId,response.razorpay_payment_id,response.razorpay_order_id,"Success","Transit").subscribe((response)=>{
        alert('Order Placed Successfully');
        this.router.navigate(['/order-tracking'], { queryParams: { orderId: this.orderId, medId:this.medId } });
        const title = "Order Placed"
        const body = "Your Order has been placed."
        this.routingService.sendNotification(this.customerId,title,body).subscribe((res)=>{
          if(res){
            console.log(res);
          }
        });
      })
    } else {
      console.log("Payment failed");
      console.log("Error:", response.error_description);
      this.medicalService.updateOrder(this.customerId,this.medId,this.orderId,"","","Failed","Failed").subscribe((response)=>{
        console.log(response);
        alert("Payment failed. Please try again.");
      })
    }
  }

  showNotification(title: string, options: NotificationOptions): void {
    if ('Notification' in window) {
        Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
                const notification = new Notification(title, options);
            }
        });
    }
}

}
