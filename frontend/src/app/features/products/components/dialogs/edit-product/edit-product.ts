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

@Component({
  selector: 'app-edit-product',
  imports: [DialogModule, FloatLabel, FormsModule, Select, InputTextModule, ButtonModule, ReactiveFormsModule],
  templateUrl: './edit-product.html',
  styleUrl: './edit-product.scss',
})
export class EditProduct implements OnInit, OnChanges {
  private fb = inject(FormBuilder);

  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter();
  @Input() product?: Product;

  closeModal() {
    this.visibleChange.emit(false);
  }

  editForm = this.fb.nonNullable.group({
    code: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    name: ['', Validators.required],
    brand: ['', Validators.required],
    category: ['', Validators.required],
  });

  brandies = ['Natura', 'Boticário', 'Eudora', 'Avon'];

  categories = ['Perfume', 'Hidratante', 'Sabonete', 'Cabelo', 'Maquiagem', 'Corpo'];

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    let product = changes['product'].currentValue;

    if (product) {
      this.editForm.patchValue({
        code: product.code,
        name: product.name,
        brand: product.brand,
        category: product.category,
      });
    }

  }
}
