import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req): string => req?.cookies?.['access_token'], // TO DO make  a type from a string 'access_token'
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  public async validate(payload: {
    sub: string;
    email: string;
  }): Promise<{ id: string; email: string }> {
    return { id: payload.sub, email: payload.email };
  }
}
