import { IsEmail, IsString, MinLength } from 'class-validator';

export class AuthDto {
    @IsEmail({}, {message: 'Imvalid email address'})
    email: string;

    @IsString({message: 'Password must be a string'})
    @MinLength(7, {message: 'Password must be at least 7 characters long'})
    password: string;
}