import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorComponent } from './doctor.component';
import { DoctorRegisterComponent } from './components/doctor-register/doctor-register.component';
import { DoctorLoginComponent } from './components/doctor-login/doctor-login.component';
import { DoctorHomeComponent } from './components/doctor-home/doctor-home.component';
import { DoctorVideoCallComponent } from './components/doctor-video-call/doctor-video-call.component';
import { DoctorSlotManagementComponent } from './components/doctor-slot-management/doctor-slot-management.component';
import { DoctorAppoinmentManagementComponent } from './components/doctor-appoinment-management/doctor-appoinment-management.component';

const routes: Routes = [
  { path: '', component: DoctorComponent },
  {path:'register',component: DoctorRegisterComponent},
  {path:'login',component: DoctorLoginComponent},
  {path:'home',component: DoctorHomeComponent},
  {path:'video-call',component: DoctorVideoCallComponent},
  {path:'slots',component:DoctorSlotManagementComponent},
  {path:'appointments',component: DoctorAppoinmentManagementComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule { }
