import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthApiService } from './auth-api.service';
import { catchError, map, of } from 'rxjs';

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
