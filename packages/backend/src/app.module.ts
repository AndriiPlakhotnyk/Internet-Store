import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from './config/env-config';
import { UserModule } from './user/user.module';
import { EmailModule } from './email/email.module';

@Module({
	imports: [AuthModule, ConfigModule],
	controllers: [AppController],
	providers: [AppService, ConfigService],
})
export class AppModule {}
