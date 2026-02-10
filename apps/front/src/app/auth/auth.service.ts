import { HttpStatusCode } from '@angular/common/http';
import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { catchError, EMPTY } from 'rxjs';
import { State } from '@lifestyle-dashboard/state';
import { AuthApiService } from './auth-api.service';
import { AuthDto } from './auth.dto';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly api = inject(AuthApiService);

  private readonly destroyRef = inject(DestroyRef);

  private readonly router = inject(Router);

  public readonly authState = signal<State | null>(null);

  public readonly formError = signal<HttpStatusCode | null>(null);

  public setState(state: State | null): void {
    this.authState.set(state);
  }

  public login(dto: AuthDto): void {
    this.authState.set(State.Loading);

    this.api
      .login(dto)
      .pipe(
        catchError((err) => {
          console.warn('Login failed', err);

          this.authState.set(State.Error);
          return EMPTY;
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        this.authState.set(State.Success);

        this.navigateToDashboard();
      });
  }

  public signUp(dto: AuthDto): void {
    this.authState.set(State.Loading);

    this.api
      .register(dto)
      .pipe(
        catchError((err) => {
          console.warn('Sign up failed', err);

          this.authState.set(err.status);

          return EMPTY;
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        this.authState.set(State.Success);

        this.navigateToDashboard();
      });
  }

  public logout(): void {
    this.api
      .logout()
      .pipe(
        catchError((err) => {
          console.warn('Logout failed', err);

          this.authState.set(err.status);

          return EMPTY;
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        this.authState.set(null);
      });
  }

  private navigateToDashboard(): void {
    this.router.navigate(['/', 'dashboard']);
  }
}
