import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class AuthDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail({}, { message: 'Invalid email address' })
  @MaxLength(254, { message: 'Email must be at most 254 characters long' })
  public email: string;

  @ApiProperty({ example: '12345678' })
  @IsString({ message: 'Password must be a string' })
  @MinLength(7, { message: 'Password must be at least 7 characters long' })
  @MaxLength(128, { message: 'Password must be at most 128 characters long' })
  public password: string;
}
