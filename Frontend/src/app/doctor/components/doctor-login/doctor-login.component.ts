import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RoutingService } from 'src/app/services/user-service/routing.service';

@Component({
  selector: 'app-doctor-login',
  templateUrl: './doctor-login.component.html',
  styleUrls: ['./doctor-login.component.css']
})
export class DoctorLoginComponent {
  
  constructor(private routeService: RoutingService, private router: Router, private formBuilder: FormBuilder) {}


  loginForm!: FormGroup;
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: this.formBuilder.control('', Validators.required),
      password: this.formBuilder.control('', Validators.required)
    });
    localStorage.clear();
  }

  login() {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    console.log(email);
    console.log(password);
    if (email && password) {
        this.routeService.doctorLogin(email, password).subscribe(
          (response) => {
            if(!response.authentication){
              alert(response.message)
              return;
            }else {
              const token= response.token;
              if(token){
                localStorage.setItem('jwtToken', token);
                this.router.navigateByUrl('/doctor/home');
                // if(response.user?.emailVerified){
                //   this.router.navigateByUrl('/medicalstore-home');
                // }else{
                //   const navigationExtras: NavigationExtras = {
                //     queryParams: {
                //       email: response.user?.email
                //     }
                //   };
                //   this.router.navigate(['/otp-verification'], navigationExtras);
                // } 
              }
            }
          }
        );
      
    } else {
      alert('Username or password is missing or invalid')
      console.log('Username or password is missing or invalid');
    }
  }
}
