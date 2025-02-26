import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtConfigService {
  constructor(private readonly configService: ConfigService) {}

  getAccessSecret(): string {
    return this.configService.get<string>('JWT_ACCESS_SECRET', 'default_access_secret');
  }

  getRefreshSecret(): string {
    return this.configService.get<string>('JWT_REFRESH_SECRET', 'default_refresh_secret');
  }

  getAccessTokenOptions(): { expiresIn: string } {
    return {
      expiresIn: '15m',
    };
  }

  getRefreshTokenOptions(): { expiresIn: string } {
    return {
      expiresIn: '7d',
    };
  }
}
