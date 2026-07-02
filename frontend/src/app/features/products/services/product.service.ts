import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../models/product.interface';
import { ProductDto } from '../models/product.dto';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);

  getProducts() {
    return this.http.get<Product[]>('https://6a34abf68248ee962fa58a3f.mockapi.io/api/products');
  }

  createProduct(dto: ProductDto) {
    return this.http.post<Product>(
      'https://6a34abf68248ee962fa58a3f.mockapi.io/api/products',
      dto,
    );
  }
}
