import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class SameOriginGuard implements CanActivate {
  public canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest<Request>();
    const source = this.getSourceUrl(req);
    const serverOrigin = this.getServerOrigin(req);

    if (!source || !serverOrigin) {
      return false;
    }

    try {
      return new URL(source).origin === serverOrigin;
    } catch {
      return false;
    }
  }

  private getServerOrigin(req: Request): string | undefined {
    const forwardedProto = this.getForwardedValue(req.get('x-forwarded-proto'));
    const forwardedHost = this.getForwardedValue(req.get('x-forwarded-host'));
    const protocol = forwardedProto ?? req.protocol;
    const host = forwardedHost ?? req.get('host');

    if (!protocol || !host) {
      return undefined;
    }

    return `${protocol}://${host}`;
  }

  private getForwardedValue(value: string | undefined): string | undefined {
    if (typeof value !== 'string' || value.length === 0) {
      return undefined;
    }

    return value.split(',')[0]?.trim() || undefined;
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
