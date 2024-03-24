import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RoutingService } from 'src/app/services/user-service/routing.service';

@Component({
  selector: 'app-tab-bar',
  templateUrl: './tab-bar.component.html',
  styleUrls: ['./tab-bar.component.css']
})
export class TabBarComponent {
  view!:boolean;

  constructor(private router: Router, private routeService:RoutingService) {}

  ngDoCheck() {
    const currentroute = this.router.url;
    if (currentroute === '/admin-medicalstoremanagement' || currentroute === '/medicalstore-requests' || currentroute === '/medicalstoremanagement') {
      this.view = true
    } else {
      this.view = false;
    }
  }
}
