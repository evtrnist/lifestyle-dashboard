import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from 'express';


@Injectable()
export class CsrfAuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const req = context.switchToHttp().getRequest<Request>();
        

        const tokenFromHeader = req.headers['x-csrf-token'];
        const tokenFromCookie = req.cookies['XSRF-TOKEN'];

        return tokenFromCookie === tokenFromHeader;
    }
}