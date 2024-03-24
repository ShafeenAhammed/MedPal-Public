import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { RoutingService } from 'src/app/services/user-service/routing.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent {
  constructor(private routeService: RoutingService, private router: Router, private formBuilder: FormBuilder){}
  registerForm!:FormGroup;
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      // name: this.formBuilder.control('', Validators.required),
      // email: this.formBuilder.control('', Validators.required),
      // mobile: this.formBuilder.control('', Validators.required),
      // age: this.formBuilder.control('',Validators.required),
      // sex: this.formBuilder.control('',Validators.required),
      // userpassword: this.formBuilder.control('', Validators.required),
      // confirmpassword: this.formBuilder.control('',Validators.required)
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{3,}$/)]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      age: ['', [Validators.required, Validators.min(8)]],
      sex: ['', Validators.required],
      userpassword: ['', [Validators.required, Validators.minLength(4)]],
      confirmpassword: ['', [Validators.required, Validators.minLength(4)]]
    });
  }
  
  register(){
    const name = this.registerForm.get('name')?.value;
    const email = this.registerForm.get('email')?.value;
    const mobile = this.registerForm.get('mobile')?.value;
    const age = this.registerForm.get('age')?.value;
    const sex = this.registerForm.get('sex')?.value;
    const userpassword = this.registerForm.get('userpassword')?.value;
    const confirmpassword = this.registerForm.get('confirmpassword')?.value;
    if(userpassword!==confirmpassword){
      alert('Enter same password!');
      return;
    }
    if(name && userpassword){
      this.routeService.register(name,email,mobile,age,sex,userpassword).subscribe(
        (response)=>{
          console.log(response);
          if(response.exist){
            alert("User already exists");
            return;
          }
          if(response.message==="success"){
            // this.routeService.sendOtp(response.email).subscribe();
            // this.router.navigateByUrl('/otp-verification');
            const navigationExtras: NavigationExtras = {
                queryParams: {
                    email: response.email
                }
            };
            this.router.navigate(['/otp-verification'], navigationExtras);
          }
        }
      )
    }
  }

}
