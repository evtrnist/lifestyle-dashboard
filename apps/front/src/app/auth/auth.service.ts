import { HttpStatusCode } from '@angular/common/http';
import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { catchError, EMPTY } from 'rxjs';
import { State } from '@lifestyle-dashboard/state';
import { AuthApiService } from './auth-api.service';
import { AuthDto } from './auth.dto';

@Injectable()
export class AuthService {
  private readonly api = inject(AuthApiService);

  private readonly destroyRef = inject(DestroyRef);

  private readonly router = inject(Router);

  public readonly authState = signal<State | null>(null);

  public setState(state: State | null) {
    this.authState.set(state);
  }

  public login(dto: AuthDto) {
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

  public signUp(dto: AuthDto) {
    this.authState.set(State.Loading);

    this.api
      .register(dto)
      .pipe(
        catchError((err) => {
          console.warn('Sign up failed', err);

          if (err.status === HttpStatusCode.Conflict) {
            this.authState.set(State.Conflict);
          } else {
            this.authState.set(State.Error);
          }

          return EMPTY;
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        this.authState.set(State.Success);

        this.navigateToDashboard();
      });
  }

  private navigateToDashboard() {
    this.router.navigate(['/', 'dashboard']);
  }
}
