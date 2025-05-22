import { IsEmail, IsOptional, IsString, Matches, MinLength } from 'class-validator';

export class UpdateProfileDto {
  
  @IsOptional()
  @IsString({ message: 'Full name is required' })
  fullName?: string;

  @IsOptional()
  @IsString()
  @Matches(/^\+?\d+$/, { message: 'Invalid phone number' })
  phoneNumber?: string;

  @IsOptional()
  @IsString({ message: 'Address is required' })
  shippingAddress?: string;

}
