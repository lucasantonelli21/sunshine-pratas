import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, tap } from 'rxjs';

import { API_BASE_URL } from '../api.config';
import { AuthSession, LoginRequest, LoginResponse } from '../models/auth.model';
import { User } from '../models/user.model';

const SESSION_KEY = 'sunshine.session';

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

  get currentUser(): User | null {
    return this.sessionSignal()?.user ?? null;
  }

  get isAdmin(): boolean {
    return this.currentUser?.role === 'admin';
  }

  login(credentials: LoginRequest): Observable<AuthSession> {
    return this.http.post<LoginResponse>(`${this.apiBaseUrl}/auth/login`, credentials).pipe(
      map((response) => ({
        accessToken: response.token,
        user: response.user,
      })),
      tap((session) => this.persistSession(session)),
    );
  }

  logout(): void {
    this.sessionSignal.set(null);
    this.storage?.removeItem(SESSION_KEY);
    void this.router.navigateByUrl('/painel/login');
  }

  updateUser(user: User): void {
    const session = this.sessionSignal();
    if (!session) return;
    this.persistSession({ ...session, user });
  }

  private persistSession(session: AuthSession): void {
    this.sessionSignal.set(session);
    this.storage?.setItem(SESSION_KEY, JSON.stringify(session));
  }

  private restoreSession(): AuthSession | null {
    const raw = this.storage?.getItem(SESSION_KEY);
    if (!raw) return null;

    try {
      const parsed = JSON.parse(raw) as Partial<AuthSession>;
      if (!parsed.accessToken || !parsed.user?.email) return null;
      return parsed as AuthSession;
    } catch {
      this.storage?.removeItem(SESSION_KEY);
      return null;
    }
  }

  private get storage(): Storage | null {
    if (!isPlatformBrowser(this.platformId)) return null;
    return this.document.defaultView?.localStorage ?? null;
  }
}
