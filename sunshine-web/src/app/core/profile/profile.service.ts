import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, switchMap, timer } from 'rxjs';

import { API_BASE_URL } from '../api.config';
import { Profile, ProfileUpdateRequest } from './profile.models';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private readonly http = inject(HttpClient);
  private readonly apiBaseUrl = inject(API_BASE_URL);

  getProfile(): Observable<Profile> {
    return this.http.get<Profile>(`${this.apiBaseUrl}/profile`);
  }

  saveProfile(payload: ProfileUpdateRequest): Observable<Profile> {
    return this.http.put<Profile>(`${this.apiBaseUrl}/profile`, payload);
  }

  watchProfile(intervalMs = 30000): Observable<Profile> {
    return timer(0, intervalMs).pipe(switchMap(() => this.getProfile()));
  }
}
