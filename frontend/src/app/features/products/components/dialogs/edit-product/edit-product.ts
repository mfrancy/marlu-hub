import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { FloatLabel } from 'primeng/floatlabel';
import { FormBuilder, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { Select } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Product } from '../../../models/product.interface';
import { ProductService } from '../../../services/product.service';
import { ProductDto } from '../../../models/product.dto';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-edit-product',
  imports: [
    DialogModule,
    FloatLabel,
    FormsModule,
    Select,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    ToastModule,
  ],
  templateUrl: './edit-product.html',
  styleUrl: './edit-product.scss',
})
export class EditProduct implements OnChanges {
  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  private msgService = inject(MessageService);
  loading = false;

  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter();
  @Input() product?: Product;
  @Output() productUpdated = new EventEmitter();

  closeModal() {
    this.visible = false;
    this.visibleChange.emit(false);
  }

  editForm = this.fb.nonNullable.group({
    code: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    name: ['', Validators.required],
    brand: ['', Validators.required],
    category: ['', Validators.required],
    imageUrl: ['', Validators.required],
  });

  brandies = ['Natura', 'Boticário', 'Eudora', 'Avon'];

  categories = ['Perfume', 'Hidratante', 'Sabonete', 'Cabelo', 'Maquiagem', 'Corpo'];

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['product']) {
      return;
    }
    let product = changes['product'].currentValue;

    if (!product) {
      return;
    }

    this.editForm.patchValue({
      code: product.code,
      name: product.name,
      brand: product.brand,
      category: product.category,
      imageUrl: product.imagePreview,
    });
  }

  onSubmit() {
    if (!this.product) {
      return;
    }
    this.loading = true;

    const id = this.product.id;
    const dto: ProductDto = this.editForm.getRawValue();

    this.productService.editProduct(id, dto).subscribe({
      next: (response) => {
        this.loading = false;
        this.showSuccess(`${response.name}`);
        this.closeModal();
        this.isProductUpdates();
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
      detail: `Produto ${message} editado `,
      life: 3000,
      key: 'br',
    });
  }

  showError() {
    this.msgService.add({
      severity: 'error',
      summary: 'Erro',
      detail: 'Não foi possível editar esse produto',
    });
  }

  isProductUpdates() {
    this.productUpdated.emit();
  }
}
