import { Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { Product } from '../../products/models/product.interface';
import { ButtonModule } from 'primeng/button';
import { ProductService } from '../../products/services/product.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-confirm-dialog',
  imports: [DialogModule, ButtonModule],
  templateUrl: './confirm-dialog.html',
  styleUrl: './confirm-dialog.scss',
})
export class ConfirmDialog {
  private productService = inject(ProductService);
  private msgService = inject(MessageService);
  loading = true;

  @Input() visible: boolean = false;
  @Input() product?: Product;
  @Output() visibleChange = new EventEmitter();
  @Output() deletedProduct = new EventEmitter();


  closeModal() {
    this.visible = false;
    this.visibleChange.emit(false);
  }

  deleteProduct() {

    if(!this.product) {
      return;
    }

    this.productService.deleteProduct(this.product.id).subscribe({
      next: (response) => {
        this.showSuccess(response.name);
        this.loading = false;
        this.isProductDeleted();
        this.closeModal();
      }, 
      error: () => {
        this.loading = false;
        this.showError();
      }
    })
  }


  showSuccess(message: string) {
    this.msgService.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: `Produto ${message} excluido `,
      life: 3000,
      key: 'br',
    });
  }


  showError() {
    this.msgService.add({
      severity: 'error',
      summary: 'Erro',
      detail: 'Não foi possível apagar esse produto',
    });
  }

  isProductDeleted() {
    this.deletedProduct.emit();
  }
}
