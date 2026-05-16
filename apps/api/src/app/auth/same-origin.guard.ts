import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class SameOriginGuard implements CanActivate {
  public canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request>();
    const source = this.getSourceUrl(req);
    const host = req.get('host');

    if (!source || !host) {
      return false;
    }

    try {
      return new URL(source).host === host;
    } catch {
      return false;
    }
  }

  private getSourceUrl(req: Request): string | undefined {
    const origin = req.get('origin');

    if (typeof origin === 'string' && origin.length > 0) {
      return origin;
    }

    const referer = req.get('referer');

    return typeof referer === 'string' && referer.length > 0 ? referer : undefined;
  }
}
