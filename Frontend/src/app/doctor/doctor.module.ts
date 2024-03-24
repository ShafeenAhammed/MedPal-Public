import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { DoctorRoutingModule } from './doctor-routing.module';
import { DoctorComponent } from './doctor.component';
import { DoctorRegisterComponent } from './components/doctor-register/doctor-register.component';
import { DoctorLoginComponent } from './components/doctor-login/doctor-login.component';
import { DoctorHomeComponent } from './components/doctor-home/doctor-home.component';
import { DoctorVideoCallComponent } from './components/doctor-video-call/doctor-video-call.component';
import { DoctorAppoinmentManagementComponent } from './components/doctor-appoinment-management/doctor-appoinment-management.component';
import { DoctorSlotManagementComponent } from './components/doctor-slot-management/doctor-slot-management.component';


@NgModule({
  declarations: [
    DoctorComponent,
    DoctorRegisterComponent,
    DoctorLoginComponent,
    DoctorHomeComponent,
    DoctorVideoCallComponent,
    DoctorAppoinmentManagementComponent,
    DoctorSlotManagementComponent
  ],
  imports: [
    CommonModule,
    DoctorRoutingModule,
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
    MatTableModule,
    MatPaginatorModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class DoctorModule { }
