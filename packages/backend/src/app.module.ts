import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './orm';
import { UserModule } from './modules/user';
import { AuthModule } from './modules/auth';
import { ProductModule } from './modules/product/product.module';
import { OrderModule } from './modules/order';
import { OrderDetailModule } from './modules/order-detail';
import { PaymentModule } from './modules/payment/payment.module';
import { RecoverPasswordModule } from './modules/recover-password/recover-password.module';

@Module({
	imports: [
		PrismaModule,
		AuthModule,
		UserModule,
		ProductModule,
		OrderModule,
		OrderDetailModule,
		PaymentModule,
		RecoverPasswordModule,
	],
	controllers: [AppController],
	providers: [AppService],
})

export class AppModule {}

