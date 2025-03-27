import { forwardRef, Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { PrismaModule } from "@/prisma/prisma.module";
import { SecurityModule } from "@/security/security.module";
import { JwtConfigModule, JwtConfigService } from "@/config/jwt-config";
import { JwtModule } from "@nestjs/jwt";
import { UserController } from "./user.controller";
import { JwtAuthModule } from "@/security";


@Module({
    imports: [
        forwardRef(() => SecurityModule),
        JwtAuthModule,
        PrismaModule
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})

export class UserModule {}