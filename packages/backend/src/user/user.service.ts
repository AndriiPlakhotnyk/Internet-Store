import { PrismaService } from "@/prisma/prisma.service";
import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { User } from "./user.model";
import { ResetPasswordDto, UpdateProfileDto } from "@/dto";
import { hashData, verifyHash } from "@/helpers";
import { GetUserResponse } from "@/types";


@Injectable()
export class UserService {
    constructor(private prismaService: PrismaService) {}

    async createUser(data: User): Promise<User> {
        const user = await this.prismaService.user.findUnique({
            where: {
                email: data.email
            }
        });

        if (user) {
            throw new ConflictException('email already exist');
        }

        return this.prismaService.user.create({
            data
        });
    }

    async changePassword(id: string, resetPasswordDto: ResetPasswordDto): Promise<void> {
        const { oldPassword, newPassword } = resetPasswordDto;

        const user = await this.findById(id);

        const isValidOldPassword = await verifyHash(oldPassword, user.password);
        if (!isValidOldPassword) {
            throw new NotFoundException('Wrong old password') 
        }

        const newHashedPassword = await hashData(newPassword);

        await this.prismaService.user.update({
            where: { id: user.id },
            data: { password: newHashedPassword }
        })
    }

    async updateProfile(id: string, updateProfileDto: UpdateProfileDto): Promise<User> {
        const { email, fullName, phoneNumber, shippingAddress } = updateProfileDto;

        return await this.prismaService.user.update({
            where: { id },
            data: {
                email,
                fullName,
                phoneNumber,
                shippingAddress,
            }
        })
    }

    async getUser(id: string): Promise<GetUserResponse> {
        const user = await this.findById(id);
        return {
            email: user.email,
            fullName: user.fullName,
            phoneNumber: user.phoneNumber,
            shippingAddress: user.shippingAddress,
        }
    }

    async findById(id: string): Promise<User> {
        const user = await this.prismaService.user.findUnique({
            where: {
                id,
            },
        });
    
        if (!user) {
            throw new NotFoundException('User not found');
        }
    
        return user;
    }
    

}