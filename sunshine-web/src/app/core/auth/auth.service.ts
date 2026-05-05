import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, tap, throwError } from 'rxjs';

import { API_BASE_URL } from '../api.config';
import { AuthSession, LoginRequest, LoginResponse, User } from './auth.models';

const SESSION_STORAGE_KEY = 'erp.session';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly apiBaseUrl = inject(API_BASE_URL);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly document = inject(DOCUMENT);

  private readonly sessionSignal = signal<AuthSession | null>(this.restoreSession());

  readonly session = this.sessionSignal.asReadonly();

  get token(): string | null {
    return this.sessionSignal()?.accessToken ?? null;
  }

  get isAuthenticated(): boolean {
    return Boolean(this.token);
  }

  login(credentials: LoginRequest): Observable<AuthSession> {
    return this.http.post<LoginResponse>(`${this.apiBaseUrl}/auth/login`, credentials).pipe(
      map((response) => ({
        accessToken: response.token,
        user: {
          id: response.userId,
          name: response.name,
          email: response.email,
          role: response.role,
        },
      })),
      tap((session) => this.setSession(session)),
      catchError((error: unknown) => throwError(() => error)),
    );
  }

  logout(): void {
    this.sessionSignal.set(null);
    this.storage?.removeItem(SESSION_STORAGE_KEY);
    void this.router.navigateByUrl('/login');
  }

  updateUser(user: User): void {
    const session = this.sessionSignal();

    if (!session) {
      return;
    }

    this.setSession({ ...session, user });
  }

  private setSession(session: AuthSession): void {
    this.sessionSignal.set(session);
    this.storage?.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
  }

  private restoreSession(): AuthSession | null {
    const rawSession = this.storage?.getItem(SESSION_STORAGE_KEY);

    if (!rawSession) {
      return null;
    }

    try {
      return this.normalizeSession(JSON.parse(rawSession));
    } catch {
      this.storage?.removeItem(SESSION_STORAGE_KEY);
      return null;
    }
  }

  private normalizeSession(value: unknown): AuthSession | null {
    if (!value || typeof value !== 'object') {
      return null;
    }

    const candidate = value as Partial<AuthSession>;

    if (!candidate.accessToken || !candidate.user?.email) {
      return null;
    }

    return {
      accessToken: candidate.accessToken,
      refreshToken: candidate.refreshToken,
      user: {
        id: String(candidate.user.id ?? ''),
        name: String(candidate.user.name ?? ''),
        email: candidate.user.email,
        role: candidate.user.role,
      },
    };
  }

  private get storage(): Storage | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }

    return this.document.defaultView?.localStorage ?? null;
  }
}
