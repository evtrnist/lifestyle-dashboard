import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '@lifestyle-dashboard/header';
import { AuthService } from './auth/auth.service';

@Component({
  standalone: true,
  selector: 'app-layout',
  imports: [RouterOutlet, HeaderComponent],
  template: `
    <lifestyle-dashboard-header (logoutRequested)="logout()" />
    <router-outlet />
  `,
})
export class AppLayoutComponent {
  private readonly authService = inject(AuthService);
  public logout(): void {
    this.authService.logout();
  }
}
