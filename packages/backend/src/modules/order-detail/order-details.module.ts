import { Module } from '@nestjs/common';
import { OrderDetailController } from './order-details.controller';
import { PrismaModule } from '@/orm';
import { OrderDetailService } from './order-details.service';
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
    controllers: [OrderDetailController],
    providers: [OrderDetailService],
})
export class OrderDetailModule {}
