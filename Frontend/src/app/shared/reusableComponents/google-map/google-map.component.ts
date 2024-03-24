import { Component, ElementRef, ViewChild} from '@angular/core';
import { GeoLocationService } from 'src/app/services/locationServices/geo-location.service';


@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})
export class GoogleMapComponent {

  @ViewChild('map') mapElement!: ElementRef;
  lat!:number;
  lng!:number;
  markerPosition: google.maps.LatLngLiteral = { lat: 0, lng: 0 };
  center = { lat: -34.397, lng: 150.644 };
  zoom = 8;

  constructor(private geolocationService: GeoLocationService) {}

  ngOnInit() {
    // this.geolocationService
    // .getCurrentPosition()
    // .then((position) => {
    //   console.log('Latitude:', position.coords.latitude);
    //   console.log('Longitude:', position.coords.longitude);
    //   this.lat = position.coords.latitude;
    //   this.lng = position.coords.longitude;
    //   this.center = { lat: this.lat, lng: this.lng };
    //   console.log("center",this.center);
    //   this.zoom = 18;
    // })
    // .catch((error) => {
    //   console.error('Error getting location:', error);
    // });
    
  }

  ngAfterViewInit() {
    this.geolocationService
    .getCurrentPosition()
    .then((position) => {
      console.log('Latitude:', position.coords.latitude);
      console.log('Longitude:', position.coords.longitude);
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
      this.center = { lat: this.lat, lng: this.lng };
      console.log("center",this.center);
      this.zoom = 16;
    })
    .catch((error) => {
      console.error('Error getting location:', error);
    });
    
  }

  requestLocation() {
    this.geolocationService
    .getCurrentPosition()
    .then((position) => {
      console.log('Latitude:', position.coords.latitude);
      console.log('Longitude:', position.coords.longitude);
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
      this.center = { lat: this.lat, lng: this.lng };
      console.log("center",this.center);
      this.zoom = 16;
    })
    .catch((error) => {
      console.error('Error getting location:', error);
    });
  }

  onMapClick(event: google.maps.MapMouseEvent) {
    const clickedLatLng = event.latLng!.toJSON();
    console.log('Clicked Latitude:', clickedLatLng.lat);
    console.log('Clicked Longitude:', clickedLatLng.lng);
    this.lat = clickedLatLng.lat;
    this.lng = clickedLatLng.lng;
    this.center = { lat: this.lat, lng: this.lng };
  }

  getMapCoordinates(): { lat: number, lng: number } {
    return { lat: this.lat, lng: this.lng };
  }

}
