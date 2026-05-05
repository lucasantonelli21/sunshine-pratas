import { Routes } from '@angular/router';

import { authGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then((module) => module.LoginPage),
  },
  {
    path: 'perfil',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/profile/profile.page').then((module) => module.ProfilePage),
  },
  {
    path: 'app/:entity',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/entity-list/entity-list.page').then((module) => module.EntityListPage),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'app/produtos',
  },
  {
    path: '**',
    redirectTo: 'app/produtos',
  },
];
