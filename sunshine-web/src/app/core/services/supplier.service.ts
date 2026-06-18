import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CreateSupplierPayload, Supplier, UpdateSupplierPayload } from '../models/supplier.model';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class SupplierService extends ApiService {
  getAll(search?: string): Observable<Supplier[]> {
    const params = search ? `?search=${encodeURIComponent(search)}` : '';
    return this.list<Supplier>(`/suppliers${params}`);
  }

  getById(id: string): Observable<Supplier> {
    return this.get<Supplier>(`/suppliers/${id}`);
  }

  create(payload: CreateSupplierPayload): Observable<Supplier> {
    return this.post<Supplier>('/suppliers', payload);
  }

  update(id: string, payload: UpdateSupplierPayload): Observable<Supplier> {
    return this.put<Supplier>(`/suppliers/${id}`, payload);
  }

  remove(id: string): Observable<void> {
    return this.delete(`/suppliers/${id}`);
  }
}
