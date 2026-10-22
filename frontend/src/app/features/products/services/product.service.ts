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
    return this.http.get<Product[]>('https://localhost:7289/api/products');
  }

  createProduct(dto: ProductDto) {
    return this.http.post<Product>(
      'https://localhost:7289/api/products',
      dto
    );
  }

  editProduct(id: string, dto: ProductDto) {
    return this.http.put<Product>(
      `https://localhost:7289/api/products/${id}`,
      dto
    )
  }

  deleteProduct(id: string) {
    return this.http.delete<Product>(`https://localhost:7289/api/products/${id}`)
  }
}
