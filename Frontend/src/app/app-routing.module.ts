import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { OtpPageComponent } from './components/otp-page/otp-page.component';
import { UserHomeComponent } from './components/user-home/user-home.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminCustomerTableComponent } from './components/admin-customer-table/admin-customer-table.component';
import { authGuard } from './cores/guards/customerGuard/auth.guard';
import { ErrorComponent } from './components/error/error.component';
import { MedicalstoreRegistrationComponent } from './components/medicalstore-registration/medicalstore-registration.component';
import { MedicalstoreRegistration2Component } from './components/medicalstore-registration2/medicalstore-registration2.component';
import { GoogleMapComponent } from './shared/reusableComponents/google-map/google-map.component';
import { TableComponent } from './shared/reusableComponents/table/table.component';
import { MedicalStoreRequestsComponent } from './components/medical-store-requests/medical-store-requests.component';
import { RegisteredMedicalStoresComponent } from './components/registered-medical-stores/registered-medical-stores.component';
import { MedicalstoreHomeComponent } from './components/medicalstore-home/medicalstore-home.component';
import { MedicalstoreAddProdcutsComponent } from './components/medicalstore-add-prodcuts/medicalstore-add-prodcuts.component';
import { MedicalstoreAddCategoryComponent } from './components/medicalstore-add-category/medicalstore-add-category.component';
import { UserMedStoreViewComponent } from './components/user-med-store-view/user-med-store-view.component';
import { MedicalstoreProductsComponent } from './components/medicalstore-products/medicalstore-products.component';
import { CartComponent } from './components/cart/cart.component';
import { OrderTrackingComponent } from './components/order-tracking/order-tracking.component';
import { SearchComponent } from './components/search/search.component';
import { MedicalStoreOrderManagementComponent } from './components/medical-store-order-management/medical-store-order-management.component';
import { MedicalStoreOrderDetailsComponent } from './components/medical-store-order-details/medical-store-order-details.component';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserOrdersComponent } from './components/user-orders/user-orders.component';
import { AdminDoctorManagementComponent } from './components/admin-doctor-management/admin-doctor-management.component';
import { UserDoctorViewComponent } from './components/user-doctor-view/user-doctor-view.component';
import { UserDoctorDetailsComponent } from './components/user-doctor-details/user-doctor-details.component';
import { UserVideoCallComponent } from './components/user-video-call/user-video-call.component';
import { UserAppoinmentsComponent } from './components/user-appoinments/user-appoinments.component';
import { OrderInvoiceComponent } from './components/order-invoice/order-invoice.component';
import { AdminMedStoreManagementComponent } from './components/admin-med-store-management/admin-med-store-management.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';

const routes: Routes = [
  {path:"",component:LandingPageComponent},
  {path:"user-register",component: UserRegisterComponent},
  {path:"user-login",component: UserLoginComponent},
  {path:"medicalstore-login", component: UserLoginComponent},
  {path:"otp-verification", component: OtpPageComponent},
  {path:"user-home", canActivate:[authGuard] ,component: UserHomeComponent},
  {path:"user-medicalstore",component: UserMedStoreViewComponent},
  // {path:"user-dashboard",component: CustomerDashboardComponent},
  {
    path: 'user-dashboard',
    component: CustomerDashboardComponent,
    children: [
      { path: '', redirectTo: 'profile', pathMatch: 'full' },
      { path: 'profile', component: UserProfileComponent },
      { path: 'appoinments', component: UserAppoinmentsComponent },
      { path: 'orders', component: UserOrdersComponent },
    ],
  },
  {path:'order-invoice',component: OrderInvoiceComponent},
  {path:"cart",component:CartComponent},
  {path:"admin-login",component: AdminLoginComponent},
  {path:"admin-home"  ,component: AdminHomeComponent},
  {path:"admin-customermanagement",component: AdminCustomerTableComponent},
  {path:"medicalstore-register1",component: MedicalstoreRegistrationComponent},
  {path:"medicalstore-register2",component: MedicalstoreRegistration2Component},
  {path:"error",component: ErrorComponent},
  {path:"maps",component: GoogleMapComponent},
  // {path:"testing",component: TableComponent},
  // {path:"medicalstoremanagement", component: TableComponent},
  {path:"medicalstore-requests", component: MedicalStoreRequestsComponent},
  {path:"admin-medicalstoremanagement", component: AdminMedStoreManagementComponent},
  {path:'medicalstore-home', component: MedicalstoreHomeComponent},
  {path:'medicalstore-addproducts', component: MedicalstoreAddProdcutsComponent},
  {path:'medicalstore-orders',component:MedicalStoreOrderManagementComponent},
  {path:'medicalstore-orderdetails',component:MedicalStoreOrderDetailsComponent},
  {path:'medicalstore-addcategory', component: MedicalstoreAddCategoryComponent},
  {path: 'medicalstore-products', component: MedicalstoreProductsComponent},
  {path: 'order-tracking', component:OrderTrackingComponent},
  {path: 'search', component:SearchComponent},
  { path: 'doctor', loadChildren: () => import('./doctor/doctor.module').then(m => m.DoctorModule) },
  {path:'admin-doctormanagement',component:AdminDoctorManagementComponent},
  {path:'doctors',component:UserDoctorViewComponent},
  {path:'doctor-details',component:UserDoctorDetailsComponent},
  {path:'patient-videocall', component:UserVideoCallComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
