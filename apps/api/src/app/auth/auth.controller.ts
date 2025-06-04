import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiBody({ type: AuthDto })
  public register(@Body() { email, password }: AuthDto) {
    return this.authService.register(email, password);
  }

  @Post('login')
  @ApiBody({ type: AuthDto })
  public login(@Body() { email, password }: AuthDto) {
    return this.authService.login(email, password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiBearerAuth()
  getMe(@Req() req: any) {
    return this.authService.getUserProfile(req.user.userId);
  }
}
