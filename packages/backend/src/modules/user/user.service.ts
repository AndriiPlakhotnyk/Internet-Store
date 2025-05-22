import { PrismaService } from "@/orm";
import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { User } from "@prisma/client";
import { CreateUserData } from "./user.type";
import { GetUserResponse, ResetPasswordDto, UpdateProfileDto } from "@/dto/user";
import { generateSecureFourDigitCode, hashData, verifyHash } from "@/helpers";
import { JwtService } from "@nestjs/jwt";
import { REFRESH_JWT } from "../tokens/tokens.module";
import { EmailService } from "@/email";


@Injectable()
export class UserService {
    constructor(
        @Inject(REFRESH_JWT) private readonly jwtService: JwtService,
        private prisma: PrismaService,
        private readonly emailService: EmailService,
    ) {}

        async findById(id: string): Promise<User> {
            const user = await this.prisma.user.findUnique({
                where: {
                    id,
                },
            });
        
            if (!user) {
                throw new NotFoundException('User not found');
            }
        
            return user;
        }

    async findUserByEmail(email: string): Promise<User> {
        const user = await this.prisma.user.findUnique({
            where: {
                email,
            },
        });
    
        if (!user) {
            throw new NotFoundException('User not found');
        }
    
        return user;
    }

    async updateVerificationCode(id: string, verificationCode: string): Promise<void> {
        await this.prisma.user.update({
            where: { id },
            data: { verificationCode },
        });
    }

    async createUser (data: CreateUserData): Promise<User> {
        return await this.prisma.user.create({
            data: {
                email: data.email,
                fullName: data.fullName,
                phoneNumber: data.phoneNumber,
                shippingAddress: data.shippingAddress,
                password: data.hashedPassword,
                verificationCode: data.hashedVerificationCode,
            },
        });
    }

    async userVerification(id: string): Promise<void> {
        await this.prisma.user.update({
            where: { id },
            data: { verificationCode: null, isVerified: true },
        });
    }

    async changePassword(id: string, resetPasswordDto: ResetPasswordDto): Promise<void> {
        const { currentPassword, newPassword } = resetPasswordDto;

        const user = await this.findById(id);

        const isValidCurrentPassword = await verifyHash(currentPassword, user.password);
        if (!isValidCurrentPassword) {
            throw new NotFoundException('Wrong old password') 
        }

        const newHashedPassword = await hashData(newPassword);

        await this.prisma.user.update({
            where: { id: user.id },
            data: { password: newHashedPassword }
        })
    }

    async updateProfile(id: string, updateProfileDto: UpdateProfileDto): Promise<User> {
        const { fullName, phoneNumber, shippingAddress } = updateProfileDto;

        return await this.prisma.user.update({
            where: { id },
            data: {
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
}