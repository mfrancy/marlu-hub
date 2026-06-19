import { Component, inject, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  imports: [ButtonModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.scss',
})
export class ProductList implements OnInit {
  private productService = inject(ProductService);

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data) => {
      console.log(data);
    });
  }
}
