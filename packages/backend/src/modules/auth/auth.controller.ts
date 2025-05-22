import { Controller, Post, Body, Param, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto, VerifyOtpDto } from '@/dto/user';
import { RefreshTokenGuard } from '../security/guards';
import { GetUserDecorator } from '@/decorators';
import { RequestWithRefreshToken } from '@/types';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @Post('register')
    async register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }

    @Post('verify-otp/:email')
    async verifyOtp(
        @Param('email') email: string,
        @Body() verifyOtpDto: VerifyOtpDto,
    ) {
        return this.authService.verifyOtp(email, verifyOtpDto);
    }

    @UseGuards(RefreshTokenGuard)
    @Post('refresh')
    async refresh(@GetUserDecorator('id') userId: string) {
        return this.authService.generateTokens(userId);
    }

    @UseGuards(RefreshTokenGuard)
    @Post('logout')
    async logout(
        @GetUserDecorator('id') userId: string,
        @Req() req: RequestWithRefreshToken
    ) {
        const refreshToken = req['refreshToken'];
        console.log('REFRESH_TOKEN: ', refreshToken)
        return this.authService.logout(userId, refreshToken);
    }
}
