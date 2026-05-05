import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { API_BASE_URL } from '../api.config';
import { EntityAction, EntityDefinition } from './entity.models';

@Injectable({ providedIn: 'root' })
export class EntityApiService {
  private readonly http = inject(HttpClient);
  private readonly apiBaseUrl = inject(API_BASE_URL);

  list(definition: EntityDefinition): Observable<Record<string, unknown>[]> {
    return this.http.get<Record<string, unknown>[]>(`${this.apiBaseUrl}${definition.listPath}`);
  }

  create(definition: EntityDefinition, payload: Record<string, unknown>): Observable<Record<string, unknown>> {
    return this.http.post<Record<string, unknown>>(`${this.apiBaseUrl}${definition.createPath}`, payload);
  }

  update(definition: EntityDefinition, id: string, payload: Record<string, unknown>): Observable<Record<string, unknown>> {
    return this.http.put<Record<string, unknown>>(`${this.apiBaseUrl}${definition.updatePath(id)}`, payload);
  }

  delete(definition: EntityDefinition, id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiBaseUrl}${definition.deletePath(id)}`);
  }

  runAction(definition: EntityDefinition, action: EntityAction, id: string): Observable<Record<string, unknown>> {
    return this.http.patch<Record<string, unknown>>(
      `${this.apiBaseUrl}${definition.updatePath(id)}${action.endpointSuffix}`,
      {},
    );
  }
}
