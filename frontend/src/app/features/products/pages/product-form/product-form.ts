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
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  imports: [TableModule, Card, InputNumber, FloatLabel, Select, InputTextModule, FileUpload, ButtonModule, ReactiveFormsModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.scss',
})
export class ProductForm {
  newProduct = inject(ProductService)
  private fb = inject(FormBuilder)

  productForm = this.fb.group({
    code: ['']
  })

  brandies = [
    'Natura',
    'Boticário',
    'Eudora',
    'Avon'
  ]

  createProduct(dto: ProductDto) {
    this.newProduct.createProduct(dto).subscribe((response) => {
      console.log(response)
    })
  }

  

}
