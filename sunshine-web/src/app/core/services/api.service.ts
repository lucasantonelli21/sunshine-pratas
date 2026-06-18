import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { API_BASE_URL } from '../api.config';

interface ApiCollection<T> {
  data: T[];
}

interface ApiItem<T> {
  data: T;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  protected readonly http = inject(HttpClient);
  protected readonly baseUrl = inject(API_BASE_URL);

  protected list<T>(path: string): Observable<T[]> {
    return this.http.get<ApiCollection<T>>(`${this.baseUrl}${path}`).pipe(map((r) => r.data));
  }

  protected get<T>(path: string): Observable<T> {
    return this.http.get<ApiItem<T>>(`${this.baseUrl}${path}`).pipe(map((r) => r.data));
  }

  protected post<T>(path: string, body: unknown): Observable<T> {
    return this.http.post<ApiItem<T>>(`${this.baseUrl}${path}`, body).pipe(map((r) => r.data));
  }

  protected put<T>(path: string, body: unknown): Observable<T> {
    return this.http.put<ApiItem<T>>(`${this.baseUrl}${path}`, body).pipe(map((r) => r.data));
  }

  protected patch<T>(path: string, body: unknown = {}): Observable<T> {
    return this.http.patch<ApiItem<T>>(`${this.baseUrl}${path}`, body).pipe(map((r) => r.data));
  }

  protected delete(path: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}${path}`);
  }
}
