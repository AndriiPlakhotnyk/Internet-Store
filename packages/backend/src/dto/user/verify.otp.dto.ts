import { IsString, Length } from 'class-validator';

export class VerifyOtpDto {
  @IsString()
  @Length(4, 4, { message: 'OTP must be exactly 4 characters long' })
  otpCode: string;
}