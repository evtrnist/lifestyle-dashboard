import { isPlatformBrowser } from '@angular/common';
import { inject, InjectionToken, PLATFORM_ID } from '@angular/core';

export const SESSION_STORAGE = new InjectionToken<Storage | null>('SESSION_STORAGE', {
  providedIn: 'root',
  factory: (): Storage | null => {
    const platformId = inject(PLATFORM_ID);

    if (!isPlatformBrowser(platformId)) {
      return null;
    }

    return window.sessionStorage;
  },
});
