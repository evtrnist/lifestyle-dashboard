import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { AuthApiService } from './auth-api.service';

export const authGuard: CanActivateFn = () => {
  const authApiService = inject(AuthApiService);
  const router = inject(Router);

  return authApiService.getMe().pipe(
    map(() => true),
    catchError(() => {
      router.navigate(['/auth']);
      return of(false);
    }),
  );
};
