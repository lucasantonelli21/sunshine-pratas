import { Routes } from '@angular/router';

import { authGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./pages/landing/landing.page').then((m) => m.LandingPage),
  },
  {
    path: 'painel',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'produtos',
      },
      {
        path: 'login',
        loadComponent: () => import('./pages/login/login.page').then((m) => m.LoginPage),
      },
      {
        path: 'perfil',
        canActivate: [authGuard],
        loadComponent: () => import('./pages/profile/profile.page').then((m) => m.ProfilePage),
      },
      {
        path: ':entity',
        canActivate: [authGuard],
        loadComponent: () => import('./pages/entity-list/entity-list.page').then((m) => m.EntityListPage),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
