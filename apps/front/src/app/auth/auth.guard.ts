import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

        console.log('User not authenticated, redirecting to /auth');

  return auth.getMe().pipe(
    map(() => true),
    catchError(() => {
      router.navigate(['/auth']);
      return of(false);
    }),
  );
};
