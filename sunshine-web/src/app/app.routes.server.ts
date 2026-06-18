import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Server,
  },
  {
    path: 'painel/login',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'painel/perfil',
    renderMode: RenderMode.Server,
  },
  {
    path: 'painel/:entity',
    renderMode: RenderMode.Server,
  },
  {
    path: '**',
    renderMode: RenderMode.Server,
  },
];
