import { forwardRef, Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { PrismaModule } from "@/orm";
import { UserController } from "./user.controller";
import { JwtConfigModule, JwtConfigService } from "@/config/jwt-config";
import { JwtModule } from "@nestjs/jwt";
import { TokenModule } from "../tokens/tokens.module";
import { EmailModule } from "@/email";


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
            TokenModule,
            EmailModule,
        ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})

export class UserModule {}