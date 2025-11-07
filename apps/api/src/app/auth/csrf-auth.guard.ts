import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';

const CSRF_HEADER_NAME = 'x-csrf-token';
const CSRF_COOKIE_NAME = 'XSRF-TOKEN';

@Injectable()
export class CsrfAuthGuard implements CanActivate {
  public canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request>();

    const tokenFromHeader = req.headers[CSRF_HEADER_NAME];
    const tokenFromCookie = req.cookies[CSRF_COOKIE_NAME];

    return tokenFromCookie === tokenFromHeader;
  }
}
