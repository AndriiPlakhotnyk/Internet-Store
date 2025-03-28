import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigModule, JwtConfigService } from '@/config/jwt-config';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [JwtConfigModule],
      inject: [JwtConfigService],
      useFactory: (jwtConfigService: JwtConfigService) => ({
        secret: jwtConfigService.getAccessSecret(),
        signOptions: { expiresIn: jwtConfigService.getAccessTokenOptions().expiresIn },
      }),
    }),
  ],
  exports: [JwtModule],
})
export class JwtAuthModule {}
