import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RoutingService } from 'src/app/services/user-service/routing.service';

@Component({
  selector: 'app-otp-page',
  templateUrl: './otp-page.component.html',
  styleUrls: ['./otp-page.component.css']
})
export class OtpPageComponent {
  otpForm!: FormGroup;
  email: string = '';
  counterTime: number = 15

  constructor(private routeService: RoutingService, private router: Router, private formBuilder: FormBuilder, private route: ActivatedRoute){}

  ngOnInit() {
    this.email = this.route.snapshot.queryParams['email'];
    this.routeService.sendOtp(this.email).subscribe();
    console.log("email ss",this.email);
    this.startTimer();
    this.otpForm = this.formBuilder.group({
      otp: ['', [Validators.required, Validators.maxLength(4), Validators.minLength(4)]]
    });
  }

  verify() {
    const otp = this.otpForm.get('otp')?.value;
    // console.log("otp",otp);
    // console.log("email ss",this.email);
    
    if(otp){
      this.routeService.otpVerification(otp,this.email).subscribe(
        (response)=>{
          console.log("verification res",response);
          if(response.status==="success"){
            const token = localStorage.getItem('jwtToken');
            if(token){
              this.router.navigateByUrl('/user-home');
            }else{
              this.router.navigateByUrl('/user-login');
            }
          }else if(response.status==="failed"){
            alert("Invalid OTP");
            return;
          }
        }
      );
    }
  }

  resendOtp() {
    if(this.counterTime <= 0){
      this.routeService.sendOtp(this.email).subscribe();;
      this.counterTime=15;
      this.startTimer();
    }
  }

  startTimer() {
    const counterTime = setInterval(() => {
      this.counterTime--;
      if (this.counterTime <= 0) {
        clearInterval(counterTime);
      }
    }, 1000);
  }

}
