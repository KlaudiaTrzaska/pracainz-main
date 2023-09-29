import { Route } from '@angular/router';

export const ROUTES: Route[] = [
  {
    path: '',
    title: 'Planowanie zakupów',
    loadComponent: async () => (await import('./home.page')).HomePage,
  },
];
