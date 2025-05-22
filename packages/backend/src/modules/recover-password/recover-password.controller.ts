import { Body, Controller, Param, Post, UseGuards } from "@nestjs/common";
import { RecoverPasswordService } from "./recover-password.service";
import { RecoverPasswordDto, VerifyCodeDto } from "@/dto/user";

@Controller('recover-password')
export class RecoverPasswordController {
constructor(private readonly recoverPasswordService: RecoverPasswordService) {}

    @Post('check-email')
    async createVerificationCode(@Body()  body: { email: string } ) {
        return this.recoverPasswordService.createVerificationCode(body.email);
    }

    @Post('verification/:id')
    async verifyCode(
        @Param('id') userId: string,
        @Body() dto: VerifyCodeDto
    ) {
        return this.recoverPasswordService.compareCodes(userId, dto);
    }

    @Post('set-new-password/:id')
    async recoverPassword(
        @Param('id') userId: string,
        @Body() dto: RecoverPasswordDto,
    ) {
        return this.recoverPasswordService.setNewPassword(userId, dto);
    }
}