import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '@lifestyle-dashboard/header';

@Component({
  standalone: true,
  selector: 'app-layout',
  imports: [RouterOutlet, HeaderComponent],
  template: `
    <lifestyle-dashboard-header />
    <router-outlet />
  `,
})
export class AppLayoutComponent {}
