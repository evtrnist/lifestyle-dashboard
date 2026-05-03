import { isPlatformBrowser } from '@angular/common';
import { inject, InjectionToken, PLATFORM_ID } from '@angular/core';

export const LOCAL_STORAGE = new InjectionToken<Storage | null>('LOCAL_STORAGE', {
  providedIn: 'root',
  factory: (): Storage | null => {
    const platformId = inject(PLATFORM_ID);

    if (!isPlatformBrowser(platformId)) {
      return null;
    }

    try {
      return window.localStorage;
    } catch {
      return null;
    }
  },
});
