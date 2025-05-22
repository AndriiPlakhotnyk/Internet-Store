import { JwtConfigModule, JwtConfigService } from "@/config/jwt-config";
import { PrismaModule } from "@/orm";
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PaymentController } from "./payment.controller";
import { PaymentService } from "./payment.service";

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
  controllers: [PaymentController],
  providers: [PaymentService],
})

export class PaymentModule{}