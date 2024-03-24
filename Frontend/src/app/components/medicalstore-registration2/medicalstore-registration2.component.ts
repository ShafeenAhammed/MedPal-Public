import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MedicalStoreService } from 'src/app/services/medical-service/medical-store.service';
import { RoutingService } from 'src/app/services/user-service/routing.service';
import { GoogleMapComponent } from 'src/app/shared/reusableComponents/google-map/google-map.component';
import { selectPage1FormData } from 'src/app/store/medicalStoreRegistration/medReg.selectors';

@Component({
  selector: 'app-medicalstore-registration2',
  templateUrl: './medicalstore-registration2.component.html',
  styleUrls: ['./medicalstore-registration2.component.css']
})
export class MedicalstoreRegistration2Component {

  @ViewChild(GoogleMapComponent, { static: false }) googleMapComponent!: GoogleMapComponent;
  page2Form!: FormGroup;
  page1Details: any;
  storeImgFileName!: string;
  licenseFileName!:string;

  constructor(private formBuilder: FormBuilder, private router: Router, private store: Store, private routeService: RoutingService) {}

  ngOnInit() {

    this.page2Form = this.formBuilder.group({
      address: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s.,#-]{8,}$/)]],
    });

    this.store.select(selectPage1FormData).subscribe((page1Details) => {
      // console.log("insde",page1Details);
      this.page1Details = page1Details;
    });
    // console.log("prevvv", this.page1Details);
    
  }

  onStoreImgSelected(event: any) {
    const file = event.target.files[0];
    this.storeImgFileName = file ? file.name : '';
  }

  onLicenseSelected(event: any) {
    const file = event.target.files[0];
    this.licenseFileName = file ? file.name : '';
  }


  // submit() {
  //   const { lat, lng } = this.googleMapComponent.getMapCoordinates();
  //   console.log('Latitude:', lat);
  //   console.log('Longitude:', lng);
  //   const address = {
  //     address: this.page2Form.get('address')?.value,
  //     latitude: lat,
  //     longitude: lng
  //   }
  //   const combinedDetails = { ...this.page1Details, address };
  //   // console.log("submit",combinedDetails);
  //   this.routeService.medicalStoreRegister(combinedDetails).subscribe(
  //     (response)=>{
  //       console.log(response);
  //       this.router.navigateByUrl('/medicalstore-register1');
  //     }
  //   )
    
  // }

  submit() {
    const { lat, lng } = this.googleMapComponent.getMapCoordinates();
    const address = {
      address: this.page2Form.get('address')?.value,
      latitude: lat,
      longitude: lng
    };

    const formData = new FormData();
    
    const combinedDetails = { ...this.page1Details, address };
    formData.append('combinedDetails', JSON.stringify(combinedDetails));

    const imageInput = document.getElementById('storeImage') as HTMLInputElement;
    if (imageInput.files && imageInput.files.length > 0) {
      formData.append('storeImage', imageInput.files[0]);
    }

    const fileInput = document.getElementById('licenseFile') as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      formData.append('licenseFile', fileInput.files[0]);
    }

    formData.forEach((value, key) => {
      console.log(key, value);
    });

    this.routeService.medicalStoreRegister(formData).subscribe(
      (response) => {
        console.log(response);
        this.router.navigateByUrl('/medicalstore-register1');
      }
    );
  }
}
