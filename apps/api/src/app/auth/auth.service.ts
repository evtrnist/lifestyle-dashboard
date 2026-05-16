import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserProfile } from '@lifestyle-dashboard/user';
import { PrismaService } from '../prisma/prisma.service';
import { RequestWithUser } from './auth.controller';

@Injectable()
export class AuthService {
  private static readonly DUMMY_PASSWORD_HASH =
    '$2b$10$8r6R5Wqv7fzg6x0H0bJHve2ktYt0giN5N4dAJE1lghYzBL2cJlg6a';

  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  public async register(
    email: string,
    password: string,
  ): Promise<{
    access_token: string;
  }> {
    const isExistingUser = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (isExistingUser) {
      throw new ConflictException('User already exists');
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await this.prismaService.user.create({
      data: { email, password: hashed },
    });

    return this.generateToken(user.id, user.email);
  }

  public async login(
    email: string,
    password: string,
  ): Promise<{
    access_token: string;
  }> {
    const user = await this.prismaService.user.findUnique({ where: { email } });
    const passwordHash = user?.password ?? AuthService.DUMMY_PASSWORD_HASH;
    const isPasswordCorrect = await bcrypt.compare(password, passwordHash);

    if (!user || !isPasswordCorrect) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateToken(user.id, user.email);
  }

  public async getUserProfile(req: RequestWithUser): Promise<UserProfile> {
    console.log('AuthService.getUserProfile called with user ID:', req.user);
    const user = await this.prismaService.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        email: true,
        createdAt: true,
        updatedAt: true,
        widgetConfigs: false,
        dayData: false,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  private generateToken(
    userId: string,
    email: string,
  ): {
    access_token: string;
  } {
    const payload = { sub: userId, email };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
