import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  public async register(email: string, password: string) {
    const hashed = await bcrypt.hash(password, 10);

    const isExistingUser = this.prismaService.user.findUnique({
        where: {email}
    })

    if (isExistingUser) {
        throw new Error('User already exists');
    }

    const user = await this.prismaService.user.create({
        data: { email, password: hashed}
    })



    return this.generateToken(user.id, user.email);
  }

  public async login(email: string, password: string) {
    const user = await this.prismaService.findUnique({ where: { email}});

    if (!user) {
        throw new Error('User not found');
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
        throw new Error('Invalid credentials')
    }
  }

  public async getUserProfile(userId: string) {
    return this.prismaService.user.findUnique({
        where: {id: userId},
        select: { id: true, email: true, createdAt: true, updatedAt: true, widgetConfigs: false, dayData: false}
    })
  }


  private generateToken(userId: string, email: string) {
    const payload = { sub: userId, email};

    return {
        access_token: this.jwtService.sign(payload),
    }
  }
}
