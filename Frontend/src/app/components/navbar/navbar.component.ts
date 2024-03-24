import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { RoutingService } from 'src/app/services/user-service/routing.service';
import {jwtDecode} from 'jwt-decode';
import { GoogleMapComponent } from 'src/app/shared/reusableComponents/google-map/google-map.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedDataService } from 'src/app/services/shared-data/shared-data.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isNavbarOpen = false;
  role: string = '';
  isMenuVisible!:boolean
  decodedtoken!:any
  userName:string = '';
  email:string = '';
  customerId!:string;
  isAddressSectionOpen: boolean = false;
  iscurrentLocation:boolean = false;
  locationForm!: FormGroup;
  lat!:number;
  lng!:number;
  addresses!:any;
  selectedAddress:any={};
  defaultAddress!:boolean;
  
  @ViewChild(GoogleMapComponent, { static: false }) googleMapComponent!: GoogleMapComponent;

  constructor(private router: Router, private routeService:RoutingService, private formBuilder: FormBuilder,private sharedDataService: SharedDataService) {}

  ngOnInit() {

    this.locationForm = this.formBuilder.group({
      address: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s.,#-]{8,}$/)]],
    });

    this.defaultAddress = true;
    // if(this.role === 'Customer'){
    //   this.routeService.getCustomerAddress(this.customerId).subscribe((response)=>{
    //     console.log(response.address);
    //   })
    // }
  }

  ngDoCheck(): void {
    const token= localStorage.getItem('jwtToken');
    if(token){
      this.decodedtoken= jwtDecode(token);
      this.role=this.decodedtoken.role;
      this.userName=this.decodedtoken.name;
      this.customerId=this.decodedtoken.id;
      console.log("tokk deco",this.decodedtoken.role, this.decodedtoken);
    }
    else{
      console.log("no tok");
      this.role='';
    }

    const currentroute = this.router.url;
    // if (currentroute === '/user-login' || currentroute === '/user-register' || currentroute ==='/otp-verification' || currentroute === '/admin-login' || currentroute === '/error') {
    //   this.isMenuVisible = false
    // } else {
    //   this.isMenuVisible = true;
    // }

    if (currentroute ==='/otp-verification') {
      this.isMenuVisible = false
    } else {
      this.isMenuVisible = true;
    }

  }

  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
  }

  toggleAddressSection() {
    this.isAddressSectionOpen = !this.isAddressSectionOpen;
    this.routeService.getCustomerAddress(this.customerId).subscribe((response)=>{
      console.log(response.address);
      this.addresses = response.address;
      // if (this.addresses && this.addresses.length > 0 && this.defaultAddress === true) {
      //   console.log("inside",this.defaultAddress);
      //   this.selectedAddress = this.addresses[0];
      // }
      console.log("hahaayayo",this.selectedAddress);
      
    })
  }

  closeAddressSection() {
    this.isAddressSectionOpen = false;
  }

  toggleCurrLoc() {
    this.iscurrentLocation = !this.iscurrentLocation;
  }

  addNewAddress(){
    const { lat, lng } = this.googleMapComponent.getMapCoordinates();
    this.lat = lat;
    this.lng = lng;
    console.log(this.lat,"hahahah");
    
    const address = {
      address: this.locationForm.get('address')?.value,
      latitude: lat,
      longitude: lng
    }
    this.routeService.addCustomerAddress(this.customerId,address).subscribe((response)=>{
      console.log(response);
      if(response.success){
        this.toggleCurrLoc();
        this.routeService.getCustomerAddress(this.customerId).subscribe((response)=>{
          this.addresses = response.address; 
        })
        this.router.navigateByUrl('user-home');
      }
    })
  }

  updateSelectedAddress(address: any) {
    this.selectedAddress = address;
    console.log('Selected Address:', this.selectedAddress);
    this.sharedDataService.updateSelectedAddress(address);
    // this.defaultAddress = false;
    
  }
  
  
}
