  import { Component } from '@angular/core';
  import { ActivatedRoute, Router } from '@angular/router';
  import { jwtDecode } from 'jwt-decode';
  import { MedicalStoreService } from 'src/app/services/medical-service/medical-store.service';
import { SharedDataService } from 'src/app/services/shared-data/shared-data.service';
  import { RoutingService } from 'src/app/services/user-service/routing.service';

  @Component({
    selector: 'app-user-med-store-view',
    templateUrl: './user-med-store-view.component.html',
    styleUrls: ['./user-med-store-view.component.css']
  })
  export class UserMedStoreViewComponent {
    storeData!:any;
    products!:any[];
    antibiotics: any[] = [];
    skinAndHairCare: any[] = [];
    healthSupplements: any[] = [];
    addToCartCounts: { [key: string]: number } = {};
    decodedtoken!:any;
    customerId!:string;
    storeName!:string;
    storeAddress!:string;

    showViewCartButton: boolean = false;

    constructor(private route: ActivatedRoute, private router: Router, private medicalService: MedicalStoreService, private routingService: RoutingService, private sharedDataService: SharedDataService) { }

    ngOnInit() {
      const token= localStorage.getItem('jwtToken');
      if(token){
        this.decodedtoken= jwtDecode(token);
        // console.log("iddd",this.decodedtoken.id);
        this.customerId=this.decodedtoken.id;
      }
      else{
        console.log("no tok"); 
      }

      this.route.queryParams.subscribe(params => {
        this.storeData = JSON.parse(params['storeData']);
        console.log(this.storeData);
        this.products = this.storeData.products;
        this.storeName = this.storeData.storeName;
        this.storeAddress = this.storeData.address.address;

        this.antibiotics = this.filterProductsByCategory('Antibiotics');
        this.skinAndHairCare = this.filterProductsByCategory('Skin and Hair Care');
        this.healthSupplements = this.filterProductsByCategory('Health Suppliments');

        this.fetchImages(this.products);

        this.sharedDataService.updateMedId(this.storeData.medId);
      });

      this.routingService.getCartProducts(this.customerId).subscribe((response) => {
        if (response.success) {
          response.cart.forEach((cartItem:any) => {
            this.addToCartCounts[cartItem.productName] = cartItem.productQuantity;
          });
          this.updateViewCartButton();
        }
      });
    }

    filterProductsByCategory(category: string) {
      return this.products.filter(product => product.productCategory === category);
    }

    fetchImages(products: any[]): void {
      products.forEach(product => {
        this.medicalService.getProductImages(product.productImages).subscribe(imageData => {
          const reader = new FileReader();
          reader.onloadend = () => {
            product.productImages = reader.result as string;
          };
          reader.readAsDataURL(imageData);
        });
      });
    }

    addToCart(product: any){
      this.addToCartCounts[product.productName] = (this.addToCartCounts[product.productName] || 0) + 1;
      this.updateViewCartButton();
      console.log("pordid",product.productId);
      this.routingService.addToCart(this.customerId,product.productId).subscribe((response)=>{
        console.log(response);
        
      })
    }

    removeFromCart(product: any){
      const newCount = Math.max((this.addToCartCounts[product.productName] || 0) - 1, 0);
      if (newCount === 0) {
        delete this.addToCartCounts[product.productName];
      } else {
        this.addToCartCounts[product.productName] = newCount;
      }
      this.routingService.removeCart(this.customerId,product.productId).subscribe((response)=>{
        console.log(response);
      })
      this.updateViewCartButton();
    }

    getAddToCartLabel(product: any): string {
      const count = this.addToCartCounts[product.productName] || 0;
      // console.log("cartte", this.addToCartCounts);
      return count > 0 ? `${count} -` : 'Add';
    }

    updateViewCartButton() {
      this.showViewCartButton = Object.keys(this.addToCartCounts).length > 0;
    }

    viewCart() {
      this.router.navigate(['/cart']);
    }

  }



