import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { GeoLocationService } from 'src/app/services/locationServices/geo-location.service';
import * as MedicalStoreRegistrationActions from '../../store/medicalStoreRegistration/medReg.actions';

@Component({
  selector: 'app-medicalstore-registration',
  templateUrl: './medicalstore-registration.component.html',
  styleUrls: ['./medicalstore-registration.component.css']
})
export class MedicalstoreRegistrationComponent {
  page1Form!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private geolocationService: GeoLocationService, private store: Store) {}

  ngOnInit() {

    this.page1Form = this.formBuilder.group({
      storeName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]{8,}$/)]],
      ownerName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]{3,}$/)]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      license: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{10}$/)]]
    });
    
  }

  nextPage() {
    if (this.page1Form.valid) {
      if (this.page1Form.valid) {
        this.store.dispatch(
          MedicalStoreRegistrationActions.setPage1FormData({
            page1FormData: this.page1Form.value,
          })
        );
        this.router.navigate(['/medicalstore-register2']);
      }
    }
  }

}
