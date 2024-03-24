import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs';
import { MedicalStoreService } from 'src/app/services/medical-service/medical-store.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchControl = new FormControl();
  searchResults: any[] = [];
  productResults: any[] = [];
  storeResults: any[] = [];

  constructor(private medicalStoreService: MedicalStoreService) { }

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(
      debounceTime(300), 
      distinctUntilChanged(),
      filter(query => query.trim() !== ''),
      switchMap((query:string) => this.medicalStoreService.search(query))
    ).subscribe((results: any) => {
      // this.searchResults = results;
      // console.log("res",this.searchResults);
      if (!results.products && !results.stores) {
        this.productResults = [];
        this.storeResults = [];
      }
      else if (!results.products ) {
        this.productResults = [];
        this.storeResults = results.stores || [];
      } 
      else if(!results.stores){
        this.storeResults = [];
        this.productResults = results.products || [];
      }
       else {
        this.productResults = results.products || [];
        this.storeResults = results.stores || [];
      }
      
    });
  }

  onSelect(result: any) {
  }
}
