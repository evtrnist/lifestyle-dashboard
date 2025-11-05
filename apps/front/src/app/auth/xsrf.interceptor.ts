import { HttpInterceptorFn } from '@angular/common/http';
import { DOCUMENT, inject } from '@angular/core';

export const xsrfInterceptor: HttpInterceptorFn = (req, next) => {
  const document = inject(DOCUMENT);
  const token = getCookie('XSRF-TOKEN', document);

  if (token) {
    req = req.clone({
      setHeaders: {
        'X-CSRF-TOKEN': token,
      },
      withCredentials: true,
    });
  }
  return next(req);
};

function getCookie(name: string, document: Document): string | null {
  return (
    document.cookie
      .split('; ')
      .map((cookie) => cookie.split('='))
      .find(([key]) => key === name)?.[1] ?? null
  );
}
