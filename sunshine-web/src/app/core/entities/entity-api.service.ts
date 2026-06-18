import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { API_BASE_URL } from '../api.config';
import { EntityAction, EntityDefinition } from './entity.models';

@Injectable({ providedIn: 'root' })
export class EntityApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(API_BASE_URL);

  private url(path: string): string {
    return `${this.baseUrl}${path}`;
  }

  list(definition: EntityDefinition): Observable<Record<string, unknown>[]> {
    return this.http
      .get<{ data: Record<string, unknown>[] }>(this.url(definition.listPath))
      .pipe(map((r) => r.data));
  }

  getById(definition: EntityDefinition, id: string): Observable<Record<string, unknown>> {
    return this.http
      .get<{ data: Record<string, unknown> }>(this.url(definition.updatePath(id)))
      .pipe(map((r) => r.data));
  }

  create(definition: EntityDefinition, payload: Record<string, unknown>): Observable<Record<string, unknown>> {
    return this.http
      .post<{ data: Record<string, unknown> }>(this.url(definition.createPath), payload)
      .pipe(map((r) => r.data));
  }

  update(definition: EntityDefinition, id: string, payload: Record<string, unknown>): Observable<Record<string, unknown>> {
    return this.http
      .put<{ data: Record<string, unknown> }>(this.url(definition.updatePath(id)), payload)
      .pipe(map((r) => r.data));
  }

  remove(definition: EntityDefinition, id: string): Observable<void> {
    return this.http.delete<void>(this.url(definition.deletePath(id)));
  }

  runAction(definition: EntityDefinition, action: EntityAction, id: string): Observable<Record<string, unknown>> {
    return this.http
      .patch<{ data: Record<string, unknown> }>(
        this.url(`${definition.updatePath(id)}${action.endpointSuffix}`),
        {},
      )
      .pipe(map((r) => r.data));
  }
}
