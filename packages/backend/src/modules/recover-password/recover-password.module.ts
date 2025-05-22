import { Module } from "@nestjs/common";
import { RecoverPasswordService } from "./recover-password.service";
import { PrismaModule } from "@/orm";
import { UserModule } from "../user";
import { EmailModule } from "@/email";
import { RecoverPasswordController } from "./recover-password.controller";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [PrismaModule, UserModule, EmailModule, JwtModule.register({})],
  controllers: [RecoverPasswordController],
  providers: [RecoverPasswordService],
})

export class RecoverPasswordModule {}