import { DatePipe } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Subscription } from 'rxjs';
import { MedicalStoreService } from 'src/app/services/medical-service/medical-store.service';

@Component({
  selector: 'app-medicalstore-products',
  templateUrl: './medicalstore-products.component.html',
  styleUrls: ['./medicalstore-products.component.css']
})
export class MedicalstoreProductsComponent implements OnDestroy {

  medId: string = '';
  decodedtoken!: any;
  data!: any;
  columns: string[] = ['productName', 'productCategory', 'price', 'mfgDate', 'expDate', 'stock', 'Actions'];
  route: string = 'Listing';
  private subscriptions: Subscription[] = [];

  constructor(private medicalService: MedicalStoreService, private router: Router, private datePipe: DatePipe) { }

  ngOnInit() {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      this.decodedtoken = jwtDecode(token);
      this.medId = this.decodedtoken.id;

      const productsSubscription = this.medicalService.getProducts(this.medId).subscribe((data) => {
        console.log('Med data:', data.products);
        this.data = data.products.map((product: any) => ({
          ...product,
          mfgDate: this.formatDate(product.mfgDate),
          expDate: this.formatDate(product.expDate)
        }));
      });

      this.subscriptions.push(productsSubscription);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  formatDate(date: string): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd') || '';
  }

  blockUnblock(email: string) {
    this.medicalService.productList().subscribe((data) => {
      console.log(data.message);
    });
  }
}
