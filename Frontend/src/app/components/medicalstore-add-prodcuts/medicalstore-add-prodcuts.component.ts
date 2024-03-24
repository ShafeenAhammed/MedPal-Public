import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { MedicalStoreService } from 'src/app/services/medical-service/medical-store.service';

@Component({
  selector: 'app-medicalstore-add-prodcuts',
  templateUrl: './medicalstore-add-prodcuts.component.html',
  styleUrls: ['./medicalstore-add-prodcuts.component.css']
})
export class MedicalstoreAddProdcutsComponent {
  
  productForm!: FormGroup;
  selectedFileName!:string;
  medId!:string;
  decodedtoken!:any;
  selectedFile!: File;

  categories: string[] = [];

  constructor(private formBuilder: FormBuilder, private medicalService: MedicalStoreService, private router: Router) { }

  ngOnInit() {

    this.medicalService.medicalStoreGetCategory().subscribe((response)=>{
      console.log("inisde",response);
      
      if(response) {
        this.categories = response.category.map((category: { categoryName: any; }) => category.categoryName);
        console.log("Categories:", this.categories);
      }
    })

    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      productCategory: ['', Validators.required],
      mfgDate: ['', Validators.required],
      expDate: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(10)]],
      stock: ['', [Validators.required, Validators.min(1)]],
      description: ['', Validators.required]
    });

    const token= localStorage.getItem('jwtToken');
    if(token){
      this.decodedtoken= jwtDecode(token);
      this.medId=this.decodedtoken.id;
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.selectedFileName = file ? file.name : '';
  }


  onSubmit() {

    const formData = new FormData();
    formData.append('medId', this.medId);
    formData.append('productData', JSON.stringify(this.productForm.value));

    const fileInput = document.getElementById('productImages') as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      formData.append('productImages', fileInput.files[0]);
    }
    
    this.medicalService.medicalStoreAddProduct(formData).subscribe((response)=>{
      if(response) {
        console.log('Product added successfully:', response);
        this.router.navigateByUrl('/medicalstore-home')
      }
    })
  }

}
