import { Route } from '@angular/router';
import { AppLayoutComponent } from './app-layout.component';
import { authGuard } from './auth/auth.guard';

export const appRoutes: Route[] = [
  {
    path: '',
    component: AppLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./dashboard/dashboard.component').then(
            (component) => component.DashboardComponent,
          ),
        canActivate: [authGuard],
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('./settings/settings.component').then((component) => component.SettingsComponent),
        canActivate: [authGuard],
        children: [
          {
            path: '',
            redirectTo: 'widget-layout',
            pathMatch: 'full',
          },
          {
            path: 'widget-layout',
            loadComponent: () =>
              import('./settings/widget-layout-settings/widget-layout-settings.component').then(
                (component) => component.WidgetLayoutSettingsComponent,
              ),
          },
        ],
      },
    ],
  },
  {
    path: 'auth',
    loadComponent: () =>
      import('./auth/auth.component').then((component) => component.AuthComponent),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
];
