// import { Injectable } from '@angular/core';
// declare var Razorpay: any;

// @Injectable({
//   providedIn: 'root'
// })
// export class RazorpayService {

//   constructor() { }
//   open(options: any, successCallback: any, cancelCallback: any) {
//     const instance = new Razorpay(options);

//     instance.on('payment.success', (response: any) => {
//       console.log("payment success",response);
      
//       successCallback(response.razorpay_payment_id);
//     });

//     instance.on('payment.cancel', (error: any) => {
//       console.error('Payment Cancelled:', error);
//       cancelCallback(error);
//     });

//     instance.open();
//   }
// }

import { Injectable } from '@angular/core';
declare var Razorpay: any;

@Injectable({
  providedIn: 'root'
})
export class RazorpayService {

  constructor() { }

  open(options: any) {
    const instance = new Razorpay(options);
    console.log("insatceeee",instance);
    
    // instance.on('payment.success', function(response: any) {
    //   console.log("payment success", response);
    //   successCallback.call(null, response.razorpay_payment_id);
    // });

    // instance.on('payment.cancel', function(error: any) {
    //   console.error('Payment Cancelled:', error);
    //   cancelCallback.call(null, error);
    // });

    instance.open();
  }
}
