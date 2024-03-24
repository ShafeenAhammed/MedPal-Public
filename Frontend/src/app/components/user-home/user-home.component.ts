import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GeoLocationService } from 'src/app/services/locationServices/geo-location.service';
import { MedicalStoreService } from 'src/app/services/medical-service/medical-store.service';
import { SharedDataService } from 'src/app/services/shared-data/shared-data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css']
})
export class UserHomeComponent {
  userLocation!: { lat: number, lng: number };
  medicalStores: any[] = []; 
  storesWithin5km: any[] = [];
  storesWithin10km: any[] = [];
  storesWithin15km: any[] = [];

  constructor(private router: Router, private medicalService: MedicalStoreService, private geolocationService: GeoLocationService,private sharedDataService: SharedDataService, private toastr: ToastrService) { }

  ngOnInit() {

    this.geolocationService.getCurrentPosition().then((position) => {
      console.log('Latitude:', position.coords.latitude);
      console.log('Longitude:', position.coords.longitude);
      this.userLocation = {lat: position.coords.latitude, lng: position.coords.longitude};
    })
    .catch((error) => {
      console.error('Error getting location:', error);
    });

    this.medicalService.listMedicalStores().subscribe((response)=>{
      if(response && response.message === 'success'){
        this.medicalStores = response.meds;
        this.filterMedicalStores();
      } else {
        console.error('Error fetching medical stores data');
      }
    });

    this.sharedDataService.selectedAddress$.subscribe((address) => {
      if (!address) {
        this.toastr.warning('Please select an address.', 'No Address Selected', {
          positionClass: 'toast-top-center',
          timeOut: 3000,
          closeButton: true
        });
        return;
      }

      this.userLocation = {lat: address.latitude, lng: address.longitude};;
      console.log("habibi",this.userLocation);
      this.medicalService.listMedicalStores().subscribe((response)=>{
        if(response && response.message === 'success'){
          this.medicalStores = response.meds;
          this.filterMedicalStores();
        } else {
          console.error('Error fetching medical stores data');
        }
      });
    });

    
  }

  filterMedicalStores(): void {
    this.storesWithin5km = this.filterStoresByDistance(5);
    this.storesWithin10km = this.filterStoresByDistance(10);
    this.storesWithin15km = this.filterStoresByDistance(15);
  }

  filterStoresByDistance(distance: number): any[] {
    return this.medicalStores
      .map(store => ({
        ...store,
        distance: this.calculateDistance(this.userLocation.lat, this.userLocation.lng, store.address.latitude, store.address.longitude)
      }))
      .filter(store => store.distance <= distance);
  }

  calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const earthRadius = 6371;
  
    const lat1Rad = this.degreesToRadians(lat1);
    const lng1Rad = this.degreesToRadians(lng1);
    const lat2Rad = this.degreesToRadians(lat2);
    const lng2Rad = this.degreesToRadians(lng2);
  
    const latDiff = lat2Rad - lat1Rad;
    const lngDiff = lng2Rad - lng1Rad;
  
    const a = Math.sin(latDiff / 2) ** 2 + Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(lngDiff / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    const distance = earthRadius * c;
  
    return distance;
  }
  
  degreesToRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }
  


}
