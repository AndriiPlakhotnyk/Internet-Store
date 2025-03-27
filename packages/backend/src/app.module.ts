import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user';
import { PrismaModule } from './prisma';
import { JwtConfigModule } from './config/jwt-config';

@Module({
	imports: [JwtConfigModule, PrismaModule, AuthModule, UserModule],
})
export class AppModule {}
