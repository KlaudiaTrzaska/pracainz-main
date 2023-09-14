import { Route } from '@angular/router';

export const ROUTES: Route[] = [
  {
    path: 'appearance',
    title: 'Appearance settings',
    loadComponent: async () => (await import('./appearance/appearance.page')).AppearancePage,
  }
];
