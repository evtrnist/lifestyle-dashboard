import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';

const CSRF_HEADER_NAME = 'x-csrf-token';
const CSRF_COOKIE_NAME = 'XSRF-TOKEN';

@Injectable()
export class CsrfAuthGuard implements CanActivate {
  public canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request>();

    const tokenFromHeader = this.getHeaderValue(req.headers[CSRF_HEADER_NAME]);
    const tokenFromCookie = req.cookies[CSRF_COOKIE_NAME];

    return (
      typeof tokenFromCookie === 'string' &&
      tokenFromCookie.length > 0 &&
      typeof tokenFromHeader === 'string' &&
      tokenFromHeader.length > 0 &&
      tokenFromCookie === tokenFromHeader
    );
  }

  private getHeaderValue(header: string | string[] | undefined): string | undefined {
    return Array.isArray(header) ? undefined : header;
  }
}
