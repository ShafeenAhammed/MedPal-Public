import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RoutingService } from 'src/app/services/user-service/routing.service';

@Component({
  selector: 'app-doctor-register',
  templateUrl: './doctor-register.component.html',
  styleUrls: ['./doctor-register.component.css']
})
export class DoctorRegisterComponent {
  registerForm!:FormGroup;
  licenseFile!:string;
  doctorImage!:string;

  constructor(private userService: RoutingService, private router: Router, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      age: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      sex: ['', Validators.required],
      license: ['', Validators.required],
      specialization: ['', Validators.required],
      currentHospital: ['', Validators.required],
      experience: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      fees: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    });
  }

  onLicenseFileChange(event: any): void {
    // const file = event.target.files[0];
    // this.registerForm.patchValue({
    //   licenseFile: file
    // });
    const file = event.target.files[0];
    this.licenseFile = file ? file.name : '';
  }

  onDoctorImageChange(event: any): void {
    // const file = event.target.files[0];
    // this.registerForm.patchValue({
    //   doctorImage: file
    // });
    const file = event.target.files[0];
    this.doctorImage = file ? file.name : '';
  }

  register() {

    const formData = new FormData();
    formData.append('doctorData', JSON.stringify(this.registerForm.value));

    const imageInput = document.getElementById('doctorImage') as HTMLInputElement;
    if (imageInput.files && imageInput.files.length > 0) {
      formData.append('doctorImage', imageInput.files[0]);
    }

    const fileInput = document.getElementById('licenseFile') as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      formData.append('licenseFile', fileInput.files[0]);
    }

    this.userService.doctorRegister(formData).subscribe((res)=>{
      console.log(res);
      if(res.success){
        this.router.navigateByUrl('doctor/login');
      }
    })

  }
}
