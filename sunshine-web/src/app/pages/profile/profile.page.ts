import { DatePipe } from '@angular/common';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { AuthService } from '../../core/auth/auth.service';
import { Profile } from '../../core/profile/profile.models';
import { ProfileService } from '../../core/profile/profile.service';

@Component({
  selector: 'app-profile-page',
  imports: [DatePipe, ReactiveFormsModule],
  templateUrl: './profile.page.html',
  styleUrl: './profile.page.scss',
})
export class ProfilePage {
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly profileService = inject(ProfileService);
  private readonly authService = inject(AuthService);
  private readonly destroyRef = inject(DestroyRef);

  readonly loading = signal(true);
  readonly saving = signal(false);
  readonly lastUpdatedAt = signal<Date | null>(null);
  readonly errorMessage = signal<string | null>(null);
  readonly successMessage = signal<string | null>(null);

  readonly form = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: [{ value: '', disabled: true }],
    phone: [''],
    document: [''],
    company: [''],
  });

  constructor() {
    this.profileService
      .watchProfile()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (profile) => this.applyProfile(profile),
        error: () => {
          this.loading.set(false);
          this.errorMessage.set('Nao foi possivel consultar os dados do perfil.');
        },
      });
  }

  save(): void {
    this.errorMessage.set(null);
    this.successMessage.set(null);

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();
    this.saving.set(true);

    this.profileService
      .saveProfile({
        name: value.name,
        phone: value.phone || undefined,
        document: value.document || undefined,
        company: value.company || undefined,
      })
      .subscribe({
        next: (profile) => {
          this.applyProfile(profile);
          this.successMessage.set('Perfil salvo com sucesso.');
          this.saving.set(false);
        },
        error: () => {
          this.errorMessage.set('Nao foi possivel salvar o perfil.');
          this.saving.set(false);
        },
      });
  }

  logout(): void {
    this.authService.logout();
  }

  private applyProfile(profile: Profile): void {
    this.form.patchValue(
      {
        name: profile.name,
        email: profile.email,
        phone: profile.phone ?? '',
        document: profile.document ?? '',
        company: profile.company ?? '',
      },
      { emitEvent: false },
    );

    this.authService.updateUser({
      id: profile.id,
      name: profile.name,
      email: profile.email,
      role: profile.role,
    });

    this.loading.set(false);
    this.lastUpdatedAt.set(new Date());
  }
}
