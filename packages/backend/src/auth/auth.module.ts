import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '@/user';
import { EmailModule } from '@/email';
import { PrismaModule, PrismaService } from '@/prisma';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigModule, JwtConfigService } from '@/config/jwt-config';
import { AtStrategy, RtStrategy } from '@/strategy';
import { AccessTokenGuard, RefreshTokenGuard } from '@/guards';

@Module({
  imports: [
    JwtConfigModule,
    UserModule,
    EmailModule,
    PrismaModule,
    JwtModule.registerAsync({
      imports: [JwtConfigModule],
      useFactory: async (jwtConfigService: JwtConfigService) => ({
        secret: jwtConfigService.getAccessSecret(),
        signOptions: jwtConfigService.getAccessTokenOptions(),
      }),
      inject: [JwtConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AtStrategy,
    RtStrategy,
    AccessTokenGuard,
    RefreshTokenGuard,
  ],
})
export class AuthModule {}
