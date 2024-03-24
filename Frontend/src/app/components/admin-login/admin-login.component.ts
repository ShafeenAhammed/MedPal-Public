import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { RoutingService } from 'src/app/services/user-service/routing.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
adminLoginForm! : FormGroup;
constructor(private routeService: RoutingService,private router: Router, private formBuilder: FormBuilder){}
ngOnInit() {
  this.adminLoginForm = this.formBuilder.group({
    email: this.formBuilder.control('', Validators.required),
    password: this.formBuilder.control('', Validators.required)
  });
  localStorage.clear();
}
login(){
  const email = this.adminLoginForm.get('email')?.value;
    const password = this.adminLoginForm.get('password')?.value;
    console.log(email);
    console.log(password);
    if (email && password) {
      this.routeService.adminLogin(email, password).subscribe(
        (response) => {
          // console.log("nameee",response.user.username);
          if(!response.authentication){
            alert(response.message)
            return;
          }else{
            const token= response.token;
            if(token){
              localStorage.setItem('jwtToken', token);
            }
            this.router.navigateByUrl('/admin-home');
          }
          
          // if(token){
          //   localStorage.setItem('jwtToken', token);
          //   if(response.role==="User"){
          //     this.store.dispatch(appActions.login({ username: response.user.username, role: response.user.role }));
          //     this.router.navigateByUrl('userhome');
          //   }else if(response.role==="Admin"){
          //     console.log(response);
          //     this.store.dispatch(adminActions.adminLogin({ adminname: response.adminname, role: response.role}));
          //     this.router.navigateByUrl('admindashboard');
          //   }
            
          // }
        }
      );
    } else {
      alert('Username or password is missing or invalid')
      console.log('Username or password is missing or invalid');
    }
  }
}

