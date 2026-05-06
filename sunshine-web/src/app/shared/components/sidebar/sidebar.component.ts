import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { AuthService } from '../../../core/auth/auth.service';
import { ENTITY_DEFINITIONS } from '../../../core/entities/entity.definitions';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, IconComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  private readonly authService = inject(AuthService);

  readonly entities = ENTITY_DEFINITIONS;
  readonly userName = computed(() => this.authService.session()?.user.name ?? 'Perfil');

  logout(): void {
    this.authService.logout();
  }
}
