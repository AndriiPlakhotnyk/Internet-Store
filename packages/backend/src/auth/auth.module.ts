import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '@/user';
import { EmailModule } from '@/email';
import { PrismaModule } from '@/prisma';
import { SecurityModule } from '@/security/security.module';
import { JwtAuthModule } from '@/security';

@Module({
  imports: [
    forwardRef(() => SecurityModule),
    JwtAuthModule,
    UserModule,
    EmailModule,
    PrismaModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
