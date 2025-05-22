import { Injectable } from '@nestjs/common';
import { ConfigService as EnvConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService {
  constructor(private readonly configService: EnvConfigService) {}

  getPort(): number {
    return this.configService.get<number>('PORT', 1);
  }

  getSupportEmail(): string {
    return this.configService.get<string>('SUPPORT_EMAIL', '');
  }

  getEmailPassword(): string {
    return this.configService.get<string>('EMAIL_PASSWORD', '');
  }

}
