import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { ConfigModule } from '@/config/env-config';

@Module({
  imports: [ConfigModule],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
