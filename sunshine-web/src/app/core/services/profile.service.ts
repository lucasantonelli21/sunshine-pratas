import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UpdateUserPayload, User } from '../models/user.model';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class ProfileService extends ApiService {
  getProfile(): Observable<User> {
    return this.get<User>('/profile');
  }

  updateProfile(payload: UpdateUserPayload): Observable<User> {
    return this.put<User>('/profile', payload);
  }
}
