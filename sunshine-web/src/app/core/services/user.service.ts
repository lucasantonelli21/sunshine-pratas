import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CreateUserPayload, UpdateUserPayload, User } from '../models/user.model';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class UserService extends ApiService {
  getAll(): Observable<User[]> {
    return this.list<User>('/users');
  }

  getById(id: string): Observable<User> {
    return this.get<User>(`/users/${id}`);
  }

  create(payload: CreateUserPayload): Observable<User> {
    return this.post<User>('/users', payload);
  }

  update(id: string, payload: UpdateUserPayload): Observable<User> {
    return this.put<User>(`/users/${id}`, payload);
  }

  remove(id: string): Observable<void> {
    return this.delete(`/users/${id}`);
  }
}
