import { Component, inject, OnInit, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.interface';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-product-list',
  imports: [ButtonModule, CardModule, TableModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductList implements OnInit {
  private productService = inject(ProductService);
  product = signal<Product[]>([])

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data) => {
      this.product.set(data)
      console.log(this.product);
    });
  }
}
