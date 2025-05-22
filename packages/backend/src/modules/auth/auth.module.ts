import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '@/modules/user';
import { EmailModule } from '@/email';
import { PrismaModule } from '@/orm';
import { TokenModule } from '../tokens/tokens.module';

@Module({
	imports: [
    	UserModule,
    	EmailModule,
    	PrismaModule,
		TokenModule,
  	],
  	controllers: [AuthController],
  	providers: [AuthService],
  	exports: [AuthService],
})
export class AuthModule {}