import { Component, inject, OnInit, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { AuthService } from '../../core/auth/auth.service';
import { User } from '../../core/models/user.model';
import { ProfileService } from '../../core/services/profile.service';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './profile.page.html',
  styleUrl: './profile.page.scss',
})
export class ProfilePage implements OnInit {
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly profileService = inject(ProfileService);
  private readonly authService = inject(AuthService);

  readonly loading = signal(true);
  readonly saving = signal(false);
  readonly errorMessage = signal<string | null>(null);
  readonly successMessage = signal<string | null>(null);

  readonly form = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: [{ value: '', disabled: true }],
    password: [''],
  });

  ngOnInit(): void {
    this.profileService.getProfile().subscribe({
      next: (user) => this.applyUser(user),
      error: () => {
        this.loading.set(false);
        this.errorMessage.set('Não foi possível consultar os dados do perfil.');
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

    const { name, password } = this.form.getRawValue();
    const payload = { name, ...(password ? { password } : {}) };

    this.saving.set(true);

    this.profileService.updateProfile(payload).subscribe({
      next: (user) => {
        this.applyUser(user);
        this.successMessage.set('Perfil salvo com sucesso.');
        this.saving.set(false);
        this.form.controls.password.reset('');
      },
      error: () => {
        this.errorMessage.set('Não foi possível salvar o perfil.');
        this.saving.set(false);
      },
    });
  }

  logout(): void {
    this.authService.logout();
  }

  private applyUser(user: User): void {
    this.form.patchValue({ name: user.name, email: user.email }, { emitEvent: false });
    this.authService.updateUser(user);
    this.loading.set(false);
  }
}
