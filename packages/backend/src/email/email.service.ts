import { ConfigService } from '@/config/env-config';
import { Injectable, OnModuleInit } from '@nestjs/common';
import nodemailer, { Transporter } from 'nodemailer';

@Injectable()
export class EmailService implements OnModuleInit {
    
    private transport: Transporter;

    constructor(
        private configService: ConfigService,
    ) {}
	onModuleInit() {
		this.transport = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: this.configService.getSupportEmail(),
				pass: this.configService.getEmailPassword(),
			},
		});
	}

	async sendVerificationMail(email: string, code: string): Promise<void> {
		try {
			await this.transport.sendMail({
				from: `Support <${this.configService.getSupportEmail()}>`,
				to: email,
				subject: 'Verify Your Email Address',
				html: this.generateVerificationEmail(code),
			});
		} catch (error) {
			console.error('Error sending verification email:', error);
			throw new Error('Failed to send verification email');
		}
	}

  async sendVerificationMailPass(email: string, code: string): Promise<void> {
		try {
			await this.transport.sendMail({
				from: `Support <${this.configService.getSupportEmail()}>`,
				to: email,
				subject: 'Verify Your Email Address',
				html: this.generateVerificationResetPassword(code),
			});
		} catch (error) {
			console.error('Error sending verification email:', error);
			throw new Error('Failed to send verification email');
		}
	}
    

	private generateVerificationEmail(code: string): string {
        return `
          <div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <h2>Verify Your Email Address</h2>
            <p>Thank you for registering. Use the verification code below to complete your registration:</p>
            
            <p style="
              font-size: 24px;
              font-weight: bold;
              letter-spacing: 4px;
              background-color: #f4f4f4;
              padding: 10px 20px;
              display: inline-block;
              border-radius: 8px;
              margin: 20px 0;">
              ${code}
            </p>
    
            <p>If you didn't request this, you can safely ignore this email.</p>
            <br>
            <p>Best regards,<br>Support Team</p>
          </div>
        `;
    }

    private generateVerificationResetPassword(code: string): string {
      return `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>Verify Your Email Address</h2>
  
          <p style="
            font-size: 24px;
            font-weight: bold;
            letter-spacing: 4px;
            background-color: #f4f4f4;
            padding: 10px 20px;
            display: inline-block;
            border-radius: 8px;
            margin: 20px 0;">
            ${code}
          </p>
  
          <p>If you didn't request this, you can safely ignore this email.</p>
          <br>
          <p>Best regards,<br>Support Team</p>
        </div>
      `;
  }
}