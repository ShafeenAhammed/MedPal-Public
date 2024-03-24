import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { RoutingService } from 'src/app/services/user-service/routing.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {
  title!:string;
  
  constructor(private routeService: RoutingService, private router: Router, private formBuilder: FormBuilder) {}


  loginForm!: FormGroup;
  ngOnInit() {

    if(this.router.url === '/user-login'){
      this.title = 'User Login'
    }else if(this.router.url === '/medicalstore-login'){
      this.title = 'Medical Store Login'
    }

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
      const currentroute = this.router.url;
      if(currentroute === '/user-login'){
        this.routeService.customerLogin(email, password).subscribe(
          (response) => {
            if(!response.authentication){
              alert(response.message)
              return;
            }else { 
              const token= response.token;
              if(token){
                localStorage.setItem('jwtToken', token);
                if(response.user?.emailVerified){
                  this.router.navigateByUrl('/user-home');
                }else{
                  const navigationExtras: NavigationExtras = {
                    queryParams: {
                      email: response.user?.email
                    }
                  };
                  this.router.navigate(['/otp-verification'], navigationExtras);
                } 
              }
            }
          }
        );
      }
      else if(currentroute === '/medicalstore-login') {
        this.routeService.medicalStoreLogin(email, password).subscribe(
          (response) => {
            if(!response.authentication){
              alert(response.message)
              return;
            }else {
              const token= response.token;
              if(token){
                localStorage.setItem('jwtToken', token);
                this.router.navigateByUrl('/medicalstore-home');
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
      }
      
    } else {
      alert('Username or password is missing or invalid')
      console.log('Username or password is missing or invalid');
    }
  }
}
