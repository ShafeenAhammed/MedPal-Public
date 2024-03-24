import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MedicalStoreService } from 'src/app/services/medical-service/medical-store.service';

@Component({
  selector: 'app-medicalstore-add-category',
  templateUrl: './medicalstore-add-category.component.html',
  styleUrls: ['./medicalstore-add-category.component.css']
})
export class MedicalstoreAddCategoryComponent {
  categoryForm!:FormGroup;
  
  constructor(private formBuilder: FormBuilder, private medicalService: MedicalStoreService, private router: Router) { }
  ngOnInit () {
    this.categoryForm = this.formBuilder.group({
      categoryName: ['', Validators.required],
    });
  }

  onSubmit() {
    const customerData = this.categoryForm.value;
    this.medicalService.medicalStoreAddCategory(customerData).subscribe((response)=>{
      if(response) {
        console.log('Product added successfully:', response);
        this.router.navigateByUrl('/medicalstore-home')
      }
    })
  }
}
