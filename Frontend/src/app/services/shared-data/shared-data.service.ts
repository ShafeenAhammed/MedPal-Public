import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  constructor() { }

  private selectedAddressSource = new BehaviorSubject<any>(null);
  selectedAddress$ = this.selectedAddressSource.asObservable();

  updateSelectedAddress(selectedAddress: any) {
    this.selectedAddressSource.next(selectedAddress);
  }

  private medIdSource = new BehaviorSubject<string>('');
  currentMedId = this.medIdSource.asObservable();

  updateMedId(medId: string) {
    this.medIdSource.next(medId);
  }
}
