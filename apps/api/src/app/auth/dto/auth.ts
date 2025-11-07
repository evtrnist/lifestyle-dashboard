import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class AuthDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail({}, { message: 'Invalid email address' })
  public email: string;

  @ApiProperty({ example: '12345678' })
  @IsString({ message: 'Password must be a string' })
  @MinLength(7, { message: 'Password must be at least 7 characters long' })
  public password: string;
}
