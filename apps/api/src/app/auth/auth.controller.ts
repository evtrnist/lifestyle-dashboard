import crypto from 'crypto';
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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { UserProfile } from '@lifestyle-dashboard/user';
import { AuthService } from './auth.service';
import { CsrfAuthGuard } from './csrf-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';

const ACCESS_TOKEN = 'access_token';
const XSRF_TOKEN = 'XSRF-TOKEN';

export interface RequestWithUser extends Request {
  // TO DO make global
  user: {
    id: string;
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
  ): Promise<{ ok: true }> {
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
  ): Promise<{ ok: true }> {
    const { access_token } = await this.authService.login(email, password);
    this.setAuthCookies(res, access_token);
    return { ok: true };
  }

  @UseGuards(JwtAuthGuard, CsrfAuthGuard)
  @Get('me')
  @ApiBearerAuth()
  public getMe(@Req() req: RequestWithUser): Promise<UserProfile> {
    console.log('Getting profile for user:', req.user);
    return this.authService.getUserProfile(req);
  }

  @Post('logout')
  public logout(@Res({ passthrough: true }) res: Response): { ok: true } {
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

  private setAuthCookies(res: Response, token: string): void {
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
