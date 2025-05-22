import { IsString, MinLength, Matches } from 'class-validator';

export class RecoverPasswordDto {
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]+$/, {
    message:
      'Password must contain at least one letter and one number',
  })
  newPassword: string;
}
