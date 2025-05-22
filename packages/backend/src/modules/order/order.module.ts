import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PrismaModule } from '@/orm';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigModule, JwtConfigService } from '@/config/jwt-config';

@Module({
    imports: [
        JwtModule.registerAsync({
            imports: [JwtConfigModule],
                useFactory: async (jwtConfigService: JwtConfigService) => ({
                    secret: jwtConfigService.getAccessSecret(),
                    signOptions: jwtConfigService.getAccessTokenOptions(),
                }),
            inject: [JwtConfigService],
        }),
            PrismaModule,
    ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
