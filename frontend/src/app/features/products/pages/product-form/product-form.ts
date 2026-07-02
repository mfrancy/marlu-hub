import { Component, inject, OnInit } from '@angular/core';
import { TableModule } from "primeng/table";
import { Card } from "primeng/card";
import { InputNumber } from "primeng/inputnumber";
import { FloatLabel } from 'primeng/floatlabel';
import { Select } from "primeng/select";
import { InputTextModule } from 'primeng/inputtext';
import { FileUpload } from 'primeng/fileupload';
import { ButtonModule } from "primeng/button";
import { ProductService } from '../../services/product.service';
import { ProductDto } from '../../models/product.dto';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  imports: [TableModule, Card, InputNumber, FloatLabel, Select, InputTextModule, FileUpload, ButtonModule, ReactiveFormsModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.scss',
})
export class ProductForm {
  newProduct = inject(ProductService)
  private fb = inject(FormBuilder)
  imagePreview: string | null = null;

  productForm = this.fb.nonNullable.group({
    code: ['', Validators.required],
    name: ['', Validators.required],
    brand: ['', Validators.required],
    category: ['', Validators.required],
    imageUrl: ['', Validators.required]
  })

  brandies = [
    'Natura',
    'Boticário',
    'Eudora',
    'Avon'
  ]

  categories = [
    'Perfume',
    'Hidratante',
    'Sabonete',
    'Cabelo',
    'Maquiagem',
    'Corpo'
  ]

  onSelect(event: any) {
    const file = event.currentFiles[0]
    
    this.imagePreview = URL.createObjectURL(file)
    this.productForm.controls.imageUrl.setValue(file.name)
  }

  onSubmit() {
    console.log('submit');
    
if (this.productForm.invalid) {
  Object.entries(this.productForm.controls).forEach(([key, control]) => {
    console.log(key, control.value, control.valid, control.errors);
  });

  return;
}
    
    const dto: ProductDto = this.productForm.getRawValue()
    console.log(dto)

    this.newProduct.createProduct(dto).subscribe((response) => {
      console.log(response)
    })
  }



  

}
