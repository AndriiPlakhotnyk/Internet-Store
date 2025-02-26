import { Injectable } from '@nestjs/common';
import { ConfigService as EnvConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService {
  constructor(private readonly configService: EnvConfigService) {}

  getPort(): number {
    return this.configService.get<number>('PORT', 1);
  }

  getDatabaseUrl(): string {
    return this.configService.get<string>('DATABASE_URL', '');
  }

  getSenderEmail(): string {
    return this.configService.get<string>('SENDER', '');
  }

  getPostmarkApiToken(): string {
    return this.configService.get<string>('POSTMARK_API_TOKEN', '');
  }
}
