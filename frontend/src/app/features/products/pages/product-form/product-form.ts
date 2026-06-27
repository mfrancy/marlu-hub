import { Component, OnInit } from '@angular/core';
import { TableModule } from "primeng/table";
import { Card } from "primeng/card";
import { InputNumber } from "primeng/inputnumber";
import { FloatLabel } from 'primeng/floatlabel';
import { Select } from "primeng/select";
import { InputTextModule } from 'primeng/inputtext';
import { FileUpload } from 'primeng/fileupload';

@Component({
  selector: 'app-product-form',
  imports: [TableModule, Card, InputNumber, FloatLabel, Select, InputTextModule, FileUpload],
  templateUrl: './product-form.html',
  styleUrl: './product-form.scss',
})
export class ProductForm {


  brandies = [
    'Natura',
    'Boticário',
    'Eudora',
    'Avon'
  ]

}
