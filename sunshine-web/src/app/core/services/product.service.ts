import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CreateProductPayload, Product, UpdateProductPayload } from '../models/product.model';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class ProductService extends ApiService {
  getAll(search?: string): Observable<Product[]> {
    const params = search ? `?search=${encodeURIComponent(search)}` : '';
    return this.list<Product>(`/products/all${params}`);
  }

  getActive(search?: string): Observable<Product[]> {
    const params = search ? `?search=${encodeURIComponent(search)}` : '';
    return this.list<Product>(`/products${params}`);
  }

  getById(id: string): Observable<Product> {
    return this.get<Product>(`/products/${id}`);
  }

  create(payload: CreateProductPayload): Observable<Product> {
    return this.post<Product>('/products', payload);
  }

  update(id: string, payload: UpdateProductPayload): Observable<Product> {
    return this.put<Product>(`/products/${id}`, payload);
  }

  activate(id: string): Observable<Product> {
    return this.patch<Product>(`/products/${id}/activate`);
  }

  deactivate(id: string): Observable<Product> {
    return this.patch<Product>(`/products/${id}/deactivate`);
  }

  remove(id: string): Observable<void> {
    return this.delete(`/products/${id}`);
  }
}
