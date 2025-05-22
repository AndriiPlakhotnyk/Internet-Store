import { Module } from '@nestjs/common';
import { JwtConfigModule } from '@/config/jwt-config';
import { AccessTokenGuard, AuthGuard, RolesGuard } from './guards';
import { AtStrategy } from './strategies';
import { TokenModule } from '../tokens/tokens.module';
import { PrismaModule } from '@/orm';



@Module({
  imports: [TokenModule, PrismaModule, JwtConfigModule],
  providers: [
    AtStrategy,
    AccessTokenGuard,
    RolesGuard,
    AuthGuard,
  ],
  exports: [
    AtStrategy,
    AccessTokenGuard,
    RolesGuard,
    AuthGuard,
  ],
})
export class SecurityModule {}
