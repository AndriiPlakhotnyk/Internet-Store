import { IsEmail, IsString, Length } from 'class-validator';

export class GetUserResponse {
  @IsEmail()
  email: string;

  @IsString()
  @Length(1, 100)
  fullName: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  shippingAddress: string;
}
