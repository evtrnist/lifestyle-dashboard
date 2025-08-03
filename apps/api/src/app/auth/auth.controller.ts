import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response, Request } from 'express';
import { CsrfAuthGuard } from './csrf-auth.guard';
import crypto from 'crypto';

const ACCESS_TOKEN = 'access_token';
const XSRF_TOKEN = 'XSRF-TOKEN';

export interface RequestWithUser extends Request {
  // TO DO make global
  user: {
    sub: string;
    email: string;
  };
}

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  public async register(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { access_token } = await this.authService.register(email, password);

    this.setAuthCookies(res, access_token);

    return { ok: true };
  }

  @HttpCode(200)
  @Post('login')
  public async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { access_token } = await this.authService.login(email, password);
    this.setAuthCookies(res, access_token);
    return { ok: true };
  }

  @UseGuards(JwtAuthGuard, CsrfAuthGuard)
  @Get('me')
  @ApiBearerAuth()
  getMe(@Req() req: RequestWithUser) {
    return this.authService.getUserProfile(req.user['sub']);
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie(ACCESS_TOKEN, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });

    res.clearCookie(XSRF_TOKEN, {
      httpOnly: false,
      secure: true,
      sameSite: 'strict',
    });
    return { ok: true };
  }

  private setAuthCookies(res: Response, token: string) {
    res.cookie(ACCESS_TOKEN, token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 3 * 60 * 60 * 1000,
    });

    res.cookie(XSRF_TOKEN, crypto.randomUUID(), {
      httpOnly: false,
      secure: true,
      sameSite: 'strict',
      maxAge: 3 * 60 * 60 * 1000,
    });
  }
}
