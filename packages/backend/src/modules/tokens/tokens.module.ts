import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtConfigModule, JwtConfigService } from '@/config/jwt-config';
import { PrismaModule, PrismaService } from '@/orm';
import { RefreshService } from './refresh-token.service';

export const ACCESS_JWT = 'ACCESS_JWT_SERVICE';
export const REFRESH_JWT = 'REFRESH_JWT_SERVICE';

@Module({
  imports: [JwtConfigModule, PrismaModule],
  providers: [
    {
      provide: ACCESS_JWT,
      useFactory: async (jwtConfig: JwtConfigService) =>
        new JwtService({
          secret: jwtConfig.getAccessSecret(),
          signOptions: jwtConfig.getAccessTokenOptions(),
        }),
      inject: [JwtConfigService],
    },
    {
      provide: REFRESH_JWT,
      useFactory: async (jwtConfig: JwtConfigService) =>
        new JwtService({
          secret: jwtConfig.getRefreshSecret(),
          signOptions: jwtConfig.getRefreshTokenOptions(),
        }),
      inject: [JwtConfigService],
    },
    {
      provide: RefreshService,
      useFactory: (
        jwtService: JwtService,
        prisma: PrismaService,
        jwtConfig: JwtConfigService,
      ) => new RefreshService(jwtService, prisma, jwtConfig),
      inject: [REFRESH_JWT, PrismaService, JwtConfigService],
    },
  ],
  exports: [ACCESS_JWT, REFRESH_JWT, RefreshService],
})
export class TokenModule {}
