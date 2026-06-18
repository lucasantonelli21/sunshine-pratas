import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CreateCustomerPayload, Customer, UpdateCustomerPayload } from '../models/customer.model';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class CustomerService extends ApiService {
  getAll(search?: string): Observable<Customer[]> {
    const params = search ? `?search=${encodeURIComponent(search)}` : '';
    return this.list<Customer>(`/customers${params}`);
  }

  getById(id: string): Observable<Customer> {
    return this.get<Customer>(`/customers/${id}`);
  }

  create(payload: CreateCustomerPayload): Observable<Customer> {
    return this.post<Customer>('/customers', payload);
  }

  update(id: string, payload: UpdateCustomerPayload): Observable<Customer> {
    return this.put<Customer>(`/customers/${id}`, payload);
  }

  remove(id: string): Observable<void> {
    return this.delete(`/customers/${id}`);
  }
}
