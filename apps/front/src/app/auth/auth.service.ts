import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { State } from './state';
import { AuthApiService } from './auth-api.service';
import { AuthDto } from './auth.dto';
import { catchError, EMPTY } from 'rxjs';

@Injectable()
export class AuthService {
  private readonly api = inject(AuthApiService);

  private readonly destroyRef = inject(DestroyRef);

  public readonly authState = signal<State | null>(null);

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
      });
  }
}
