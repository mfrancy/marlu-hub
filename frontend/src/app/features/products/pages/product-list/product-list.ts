import { Component, EventEmitter, inject, OnInit, output, Output, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.interface';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { EditProduct } from '../../components/dialogs/edit-product/edit-product';
import { ConfirmDialog } from '../../../shared/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-product-list',
  imports: [ButtonModule, ConfirmDialog, CardModule, TableModule, EditProduct],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductList implements OnInit {
  private productService = inject(ProductService);
  product = signal<Product[]>([]);
  editDialogVisible: boolean = false;
  confirmDialogVisible: boolean = false;
  dataProduct?: Product;

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe((data) => {
      this.product.set(data);
      console.log(this.product);
    });
  }

  showEditDialog(data: Product) {
    this.dataProduct = data;
    this.editDialogVisible = true;
  }

  showConfirmDialog(data: Product) {
    this.dataProduct = data
    this.confirmDialogVisible = true;
  }

  onUpdated() {
    this.loadProducts();
  }
  
  onDeleted() {
    this.loadProducts();
  }
}
