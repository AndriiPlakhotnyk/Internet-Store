import { Body, Controller, Get, Put, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { GetUserDecorator } from "@/decorators";
import { ResetPasswordDto, UpdateProfileDto } from "@/dto";
import { AccessTokenGuard } from "@/security/guards";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @UseGuards(AccessTokenGuard)
    @Put('reset-password')
    async resetPassword(
        @GetUserDecorator('id') userId: string,
        @Body() resetPasswordDto: ResetPasswordDto,
    ) {
        console.log('RESET_PASSWORD METHOD start')
        return this.userService.changePassword(userId, resetPasswordDto);
    }

    @UseGuards(AccessTokenGuard)
    @Put('profile')
    async editProfile(
        @GetUserDecorator('id') userId: string,
        @Body() updateProfileDto: UpdateProfileDto,
    ) {
        return this.userService.updateProfile(userId, updateProfileDto);
    }

    @UseGuards(AccessTokenGuard)
    @Get('user-info')
    async getUserInfo(
        @GetUserDecorator('id') userId: string,
    ) {
        return this.userService.getUser(userId);
    }

}