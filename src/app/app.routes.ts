import { Routes } from '@angular/router';
import { AuthGuard, NoAuthGuard } from '@lib/guards';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: async () => (await import('@pages/home/home.routes')).ROUTES,
    canLoad: [AuthGuard],
  },
  {
    path: 'settings',
    loadChildren: async () => (await import('@pages/settings/settings.routes')).ROUTES,
    canLoad: [AuthGuard],
  },
  {
    path: '**',
    loadComponent: async () => (await import('@pages/screens/not-found/not-found.page')).NotFoundPage,
  },
];
