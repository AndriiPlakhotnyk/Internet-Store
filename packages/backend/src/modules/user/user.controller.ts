import { Body, Controller, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { GetUserDecorator } from "@/decorators";
import { AccessTokenGuard } from "../security/guards";
import { ResetPasswordDto, UpdateProfileDto } from "@/dto/user";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @UseGuards(AccessTokenGuard)
    @Put('reset-password')
    async resetPassword(
        @GetUserDecorator('id') userId: string,
        @Body() resetPasswordDto: ResetPasswordDto,
    ) {
        console.log('CONTROLLER_METHOD_WORK')
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