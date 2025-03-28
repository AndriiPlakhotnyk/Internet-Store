import { Controller, Post, Body, Param, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto, VerifyOtpDto } from '@/dto';
import { GetUserDecorator } from '../decorators/get-user-decorator';
import { Public } from '@/decorators';
import { RefreshTokenGuard } from '@/security/guards';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Public()
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Public()
  @Post('verify-otp/:email')
  async verifyOtp(
    @Param('email') email: string,
    @Body() verifyOtpDto: VerifyOtpDto,
  ) {
    return this.authService.verifyOtp(email, verifyOtpDto);
  }

  @Public()
  @Post('forgot-password')
	async requestPasswordRecover(@Body('email') email: string) {
		return this.authService.requestUpdatePassword(email);
	}

  @Public()
	@Post('recover-password/:token')
	async recoverPassword(
    @Param('token') token: string,
    @Body('newPassword')  newPassword: string,
  ) {
		return this.authService.updatePassword(token, newPassword);
	}

  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  async refresh(@GetUserDecorator('id') userId: string) {
    return this.authService.generateTokens(userId);
  }

  @UseGuards(RefreshTokenGuard)
  @Post('logout')
  async logout(@GetUserDecorator('id') userId: string) {
    return this.authService.logout(userId);
  }
}
