import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MatCardModule} from "@angular/material/card"
import {MatFormFieldModule} from "@angular/material/form-field"
import {MatInputModule} from "@angular/material/input"
import {MatSelectModule} from "@angular/material/select"
import {MatButtonModule} from "@angular/material/button"
import {MatCheckboxModule} from "@angular/material/checkbox"
import {MatRadioModule} from "@angular/material/radio"
import {MatDialogModule} from "@angular/material/dialog"
import {MatTableModule} from "@angular/material/table"
import {MatPaginatorModule} from "@angular/material/paginator"
import {MatSortModule} from "@angular/material/sort"
import {MatSnackBarModule} from "@angular/material/snack-bar"
import {MatToolbarModule} from "@angular/material/toolbar"
import {MatSidenavModule} from "@angular/material/sidenav"
import {MatMenuModule} from "@angular/material/menu"
import {MatListModule} from "@angular/material/list"
import {MatIconModule} from "@angular/material/icon"
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { OtpPageComponent } from './components/otp-page/otp-page.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { MedicalstoreLoginComponent } from './components/medicalstore-login/medicalstore-login.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { UserHomeComponent } from './components/user-home/user-home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { AdminCustomerTableComponent } from './components/admin-customer-table/admin-customer-table.component';
import { JwtInterceptor } from './cores/interceptors/jwt/jwt.interceptor';
import { ErrorComponent } from './components/error/error.component';
import { ErrorInterceptor } from './cores/interceptors/error/error.interceptor';
import { MedicalstoreRegistrationComponent } from './components/medicalstore-registration/medicalstore-registration.component';
import { MedicalstoreRegistration2Component } from './components/medicalstore-registration2/medicalstore-registration2.component';
import { GoogleMapComponent } from './shared/reusableComponents/google-map/google-map.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { medicalStoreRegistrationReducer } from './store/medicalStoreRegistration/medReg.reducer';
import { localStorageSync } from 'ngrx-store-localstorage';
import { TableComponent } from './shared/reusableComponents/table/table.component';
import { MedicalStoreRequestsComponent } from './components/medical-store-requests/medical-store-requests.component';
import { RegisteredMedicalStoresComponent } from './components/registered-medical-stores/registered-medical-stores.component';
import { MedicalstoreHomeComponent } from './components/medicalstore-home/medicalstore-home.component';
import { MedicalstoreAddProdcutsComponent } from './components/medicalstore-add-prodcuts/medicalstore-add-prodcuts.component';
import { MedicalstoreAddCategoryComponent } from './components/medicalstore-add-category/medicalstore-add-category.component';
import { UserMedStoreViewComponent } from './components/user-med-store-view/user-med-store-view.component';
import { TabBarComponent } from './shared/reusableComponents/tab-bar/tab-bar.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MedicalstoreProductsComponent } from './components/medicalstore-products/medicalstore-products.component';
import { MedicalstoreCheckoutpageComponent } from './components/medicalstore-checkoutpage/medicalstore-checkoutpage.component';
import { CartComponent } from './components/cart/cart.component';
import { AddressSelectComponent } from './components/address-select/address-select.component';
import { environment } from "../environments/environment";
// import { initializeApp } from "firebase/app";
// initializeApp(environment.firebase);
import { AngularFireModule } from '@angular/fire/compat';
import { SwPush, ServiceWorkerModule } from '@angular/service-worker';
import { OrderTrackingComponent } from './components/order-tracking/order-tracking.component';
import { SearchComponent } from './components/search/search.component';
import { DatePipe } from '@angular/common';
import { MedicalStoreOrderManagementComponent } from './components/medical-store-order-management/medical-store-order-management.component';
import { MedicalStoreUpdateOrderComponent } from './components/medical-store-update-order/medical-store-update-order.component';
import { MedicalStoreOrderDetailsComponent } from './components/medical-store-order-details/medical-store-order-details.component';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';
import { DashboardSideBarComponent } from './components/dashboard-side-bar/dashboard-side-bar.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserOrdersComponent } from './components/user-orders/user-orders.component';
import { AdminDoctorManagementComponent } from './components/admin-doctor-management/admin-doctor-management.component';
import { RegisteredDoctorsComponent } from './components/registered-doctors/registered-doctors.component';
import { DoctorRequestsComponent } from './components/doctor-requests/doctor-requests.component';
import { UserDoctorViewComponent } from './components/user-doctor-view/user-doctor-view.component';
import { UserDoctorDetailsComponent } from './components/user-doctor-details/user-doctor-details.component';
import { UserVideoCallComponent } from './components/user-video-call/user-video-call.component';
import { UserAppoinmentsComponent } from './components/user-appoinments/user-appoinments.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { OrderInvoiceComponent } from './components/order-invoice/order-invoice.component';
import { ChartModule } from 'angular-highcharts';
import { AdminDocStatsComponent } from './components/admin-doc-stats/admin-doc-stats.component';
import { AdminMedStoreStatsComponent } from './components/admin-med-store-stats/admin-med-store-stats.component';
import { AdminMedStoreManagementComponent } from './components/admin-med-store-management/admin-med-store-management.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { PageLoaderInterceptor } from './cores/interceptors/pageLoader/page-loader.interceptor';
import { ToastrModule } from 'ngx-toastr';

// const localStorageSyncReducer = (reducer: any) =>
//   localStorageSync({ keys: ['medicalStoreRegistration'], rehydrate: true })(reducer);

const localStorageSyncReducer = (reducer: any) => {
  return (state: any, action: any) => {
    const nextState = reducer(state, action);
    
    localStorage.setItem('medRegState', JSON.stringify(nextState));
    const localStorageSyncResult = localStorageSync({ keys: ['medRegState'], rehydrate: true })(reducer);
    // console.log('localStorageSync Result:', localStorageSyncResult);
    // console.log('localStorage contents after sync:', localStorage.getItem('medRegState'));
    return nextState;
  };
};


const metaReducers = [localStorageSyncReducer];

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    UserRegisterComponent,
    OtpPageComponent,
    AdminLoginComponent,
    MedicalstoreLoginComponent,
    AdminHomeComponent,
    UserHomeComponent,
    NavbarComponent,
    AdminCustomerTableComponent,
    ErrorComponent,
    MedicalstoreRegistrationComponent,
    MedicalstoreRegistration2Component,
    GoogleMapComponent,
    TableComponent,
    MedicalStoreRequestsComponent,
    RegisteredMedicalStoresComponent,
    MedicalstoreHomeComponent,
    MedicalstoreAddProdcutsComponent,
    MedicalstoreAddCategoryComponent,
    UserMedStoreViewComponent,
    TabBarComponent,
    MedicalstoreProductsComponent,
    MedicalstoreCheckoutpageComponent,
    CartComponent,
    AddressSelectComponent,
    OrderTrackingComponent,
    SearchComponent,
    MedicalStoreOrderManagementComponent,
    MedicalStoreUpdateOrderComponent,
    MedicalStoreOrderDetailsComponent,
    CustomerDashboardComponent,
    DashboardSideBarComponent,
    UserProfileComponent,
    UserOrdersComponent,
    AdminDoctorManagementComponent,
    RegisteredDoctorsComponent,
    DoctorRequestsComponent,
    UserDoctorViewComponent,
    UserDoctorDetailsComponent,
    UserVideoCallComponent,
    UserAppoinmentsComponent,
    OrderInvoiceComponent,
    AdminDocStatsComponent,
    AdminMedStoreStatsComponent,
    AdminMedStoreManagementComponent,
    LandingPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatSidenavModule,
    MatMenuModule,
    MatListModule,
    MatIconModule,
    MatButtonToggleModule,
    MatTooltipModule,
    BrowserModule,
    HttpClientModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    GoogleMapsModule,
    ChartModule,
    StoreModule.forRoot({medicalStoreRegistration : medicalStoreRegistrationReducer}, { metaReducers }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot(),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot(),
    MatTabsModule,
    AngularFireModule.initializeApp(environment.firebase),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    ToastrModule.forRoot(),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: PageLoaderInterceptor, multi: true },
    SwPush,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
