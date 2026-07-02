import { Component, inject } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Card } from 'primeng/card';
import { FloatLabel } from 'primeng/floatlabel';
import { Select } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { FileUpload } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { ProductService } from '../../services/product.service';
import { ProductDto } from '../../models/product.dto';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  imports: [
    TableModule,
    Card,
    FloatLabel,
    Select,
    InputTextModule,
    FileUpload,
    ButtonModule,
    ReactiveFormsModule,
    ToastModule,
  ],
  templateUrl: './product-form.html',
  styleUrl: './product-form.scss',
})
export class ProductForm {
  private fb = inject(FormBuilder);
  private msgService = inject(MessageService);
  private router = inject(Router)
  productService = inject(ProductService);
  imagePreview: string | null = null;
  loading = false;

  productForm = this.fb.nonNullable.group({
    code: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    name: ['', Validators.required],
    brand: ['', Validators.required],
    category: ['', Validators.required],
    imageUrl: ['', Validators.required],
  });

  brandies = ['Natura', 'Boticário', 'Eudora', 'Avon'];

  categories = ['Perfume', 'Hidratante', 'Sabonete', 'Cabelo', 'Maquiagem', 'Corpo'];

  onSelect(event: any) {
    const file = event.currentFiles[0];

    this.imagePreview = URL.createObjectURL(file);
    this.productForm.controls.imageUrl.setValue(file.name);
  }

  onSubmit() {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    const dto: ProductDto = this.productForm.getRawValue();

    this.productService.createProduct(dto).subscribe({
      next: (response) => {
        this.showSuccess(response.name);
        this.loading = false;
        this.router.navigate(['/products'])
      },
      error: () => {
        this.showError();
        this.loading = false;
      },
    });
  }

  showSuccess(message: string) {
    this.msgService.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: `Produto ${message} cadastrado `,
      life: 3000,
      key: 'br',
    });
  }

  showError() {
    this.msgService.add({
      severity: 'error',
      summary: 'Erro',
      detail: 'Não foi possível cadastrar esse produto',
    });
  }

  isFieldInvalid(control: string, type: string): boolean {
    const formControl = this.productForm.get(control);
    return !!(formControl?.touched && formControl?.hasError(type));
  }
}
