import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard.component').then((component) => component.DashboardComponent),
    }
];
