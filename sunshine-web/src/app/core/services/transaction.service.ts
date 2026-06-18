import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CreateTransactionPayload, Transaction, UpdateTransactionPayload } from '../models/transaction.model';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class TransactionService extends ApiService {
  getAll(filters?: { search?: string; type?: string; status?: string }): Observable<Transaction[]> {
    const params = new URLSearchParams();
    if (filters?.search) params.set('search', filters.search);
    if (filters?.type) params.set('type', filters.type);
    if (filters?.status) params.set('status', filters.status);
    const query = params.toString() ? `?${params.toString()}` : '';
    return this.list<Transaction>(`/transactions${query}`);
  }

  getById(id: string): Observable<Transaction> {
    return this.get<Transaction>(`/transactions/${id}`);
  }

  create(payload: CreateTransactionPayload): Observable<Transaction> {
    return this.post<Transaction>('/transactions', payload);
  }

  update(id: string, payload: UpdateTransactionPayload): Observable<Transaction> {
    return this.put<Transaction>(`/transactions/${id}`, payload);
  }

  settle(id: string): Observable<Transaction> {
    return this.patch<Transaction>(`/transactions/${id}/settle`);
  }

  remove(id: string): Observable<void> {
    return this.delete(`/transactions/${id}`);
  }
}
