// security.module.ts
import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigModule, JwtConfigService } from '@/config/jwt-config';
import { AtStrategy, RtStrategy } from './strategy';
import { AccessTokenGuard, RefreshTokenGuard } from './guards';
import { AuthModule } from '@/auth/auth.module';
import { JwtAuthModule } from './jwt-auth.module';


@Module({
  imports: [
    forwardRef(() => AuthModule),
    JwtConfigModule,
    JwtAuthModule
  ],
  providers: [
    AtStrategy,
    RtStrategy,
    AccessTokenGuard,
    RefreshTokenGuard,
  ],
  exports: [
    AtStrategy,
    RtStrategy,
    AccessTokenGuard,
    RefreshTokenGuard,
  ],
})
export class SecurityModule {}
