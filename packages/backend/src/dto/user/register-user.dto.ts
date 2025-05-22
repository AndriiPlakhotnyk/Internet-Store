import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';


export class RegisterDto {
    @IsEmail({}, { message: 'Invalid email format' })
    email: string;

    @IsString()
    @IsNotEmpty({ message: 'Full name is required' })
    fullName: string;

    @IsString()
    @IsNotEmpty({ message: 'Phone number is required' })
    phoneNumber: string;

    @IsString()
    @IsNotEmpty({ message: 'Shipping address is required' })
    shippingAddress: string;

    @IsString()
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    password: string;
}