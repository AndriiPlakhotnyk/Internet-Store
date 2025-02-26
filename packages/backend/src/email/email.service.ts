import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import * as Postmark from 'postmark';
import { ConfigService } from '@/config/env-config';

@Injectable()
export class EmailService implements OnModuleInit {
  private client: Postmark.ServerClient;
  private supportEmail: string;
  private readonly logger = new Logger(EmailService.name);

  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    await this.initializeClient();
  }

  private async initializeClient() {
    const apiToken = this.configService.getPostmarkApiToken();
    this.supportEmail = this.configService.getSenderEmail();

    if (!apiToken) {
      throw new Error('POSTMARK_API_TOKEN is not defined in environment variables.');
    }
    if (!this.supportEmail) {
      throw new Error('SENDER is not defined in environment variables.');
    }

    this.client = new Postmark.ServerClient(apiToken);

    // try {
    //   await this.client.getServer();
    // } catch (error) {
    //   throw new Error('Invalid Postmark API Token.');
    // }
  }

  async sendVerificationEmail(email: string, verificationCode: string): Promise<void> {
    try {
      const message = {
        From: this.supportEmail,
        To: email,
        Subject: 'Your verification code is:',
        TextBody: `${verificationCode}`,
      };

      await this.client.sendEmail(message);
      this.logger.log(`Verification email sent to ${email}`);
    } catch (err) {
      // this.logger.error(`Failed to send verification email to ${email}`, err);
      // throw new Error('Email sending failed, please try again later.');
    }
  }
}
