import { IsString, MinLength, NotEquals } from 'class-validator';

export class ResetPasswordDto {
  @IsString()
  @MinLength(6)
  oldPassword: string;

  @IsString()
  @MinLength(6)
  @NotEquals('oldPassword', {
    message: 'Your new password must be different from the current one.',
  })
  newPassword: string;
}
