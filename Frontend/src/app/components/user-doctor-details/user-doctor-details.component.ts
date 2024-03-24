import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { DoctorService } from 'src/app/services/doctorService/doctor.service';
import { RazorpayService } from 'src/app/services/razorpay/razorpay.service';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-doctor-details',
  templateUrl: './user-doctor-details.component.html',
  styleUrls: ['./user-doctor-details.component.css']
})
export class UserDoctorDetailsComponent {
  doctorId!: string;
  doctorDetails: any;
  customerId!:string;
  appoinmentId!:string;
  bookedSlotId!:string;
  customerName!:string;
  docSlots!:any[];
  selectedDate!: Date | null;
  slotsForSelectedDay!:any[]
  selectedSection: string = 'about';

  constructor(private router: Router,private route: ActivatedRoute, private doctorService: DoctorService, private razorpayService:RazorpayService, private toastr: ToastrService) { }

  ngOnInit(): void {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      const customerId = decodedToken.id;
      this.customerName = decodedToken.name
      this.customerId = customerId;
      this.doctorId = this.route.snapshot.queryParams['doctorId'];
      this.loadDoctorDetails();  
    };
    
  }

  loadDoctorDetails() {
    this.doctorService.getDoctorById(this.doctorId).subscribe((data) => {
      this.doctorDetails = data.doctor;
      console.log("docs",this.doctorDetails);
      this.fetchDocImage();
      this.fetchDocSlots();
    });
  }

  fetchDocImage() {
    this.doctorService.getDocImage(this.doctorDetails.doctorImage).subscribe((data)=>{
      const reader = new FileReader();
      reader.onloadend = () => {
        this.doctorDetails.doctorImage = reader.result as string;
      };
      reader.readAsDataURL(data);
    })
  }

  onSectionSelected(section: string): void {
    this.selectedSection = section;
  }

  fetchDocSlots() {
    this.doctorService.getDoctorSlots(this.doctorId).subscribe({
      next: (slots: any[]) => {
        this.docSlots = slots;
        console.log("exs",this.docSlots);
        
      },
      error: (error:any) => console.error(error)
    });
  }

  showSlotsForDay(selectedDate: Date) {
    this.selectedDate = selectedDate;
    this.slotsForSelectedDay = this.docSlots.filter(slot => {
      const slotDate = new Date(slot.startTime);
      return slotDate.toDateString() === selectedDate.toDateString();
    });
  }

  bookSlot(slot: any) {
    const startTime = slot.startTime;
    const endTime = slot.endTime;
    this.bookedSlotId = slot.slotId;
    const timeSlot = {
      startTime: startTime,
      endTime: endTime
    };
    this.doctorService.makeAppoinment(slot.slotId,this.customerId,this.customerName,this.doctorId,this.doctorDetails.name,this.doctorDetails.fees,timeSlot).subscribe((response)=>{
      if(response.success){
        this.appoinmentId = response.appoinment.appoinmentId
        this.openRazorpay(response.order_id)
      }
    })
  }

  openRazorpay(order_id:string) {
    const options = {
      key: environment.RAZORPAY_ID_KEY, 
      amount: this.doctorDetails.fees * 100, 
      currency: 'INR', 
      name: 'MedPal',
      description: 'Payment for Consultation',
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
      this.doctorService.updateAppoinment(this.bookedSlotId,this.customerId,this.doctorId,this.appoinmentId,response.razorpay_payment_id,response.razorpay_order_id,"Success","Transit").subscribe((response)=>{
        this.toastr.success('Payment Success', 'Appointment Booked');
        this.router.navigateByUrl('/user-dashboard/appoinments')
        // this.router.navigate(['/order-tracking'], { queryParams: { orderId: this.orderId, medId:this.medId } });
        // const title = "Order Placed"
        // const body = "Your Order has been placed."
        // this.routingService.sendNotification(this.customerId,title,body).subscribe((res)=>{
        //   if(res){
        //     console.log(res);
        //   }
        // });
      })
    } else {
      console.log("Payment failed");
      console.log("Error:", response.error_description);
      this.doctorService.updateAppoinment(this.bookedSlotId,this.customerId,this.doctorId,this.appoinmentId,"","","Failed","Failed").subscribe((response)=>{
        console.log(response);
        alert("Payment failed. Please try again.");
      })
    }
  }

}
