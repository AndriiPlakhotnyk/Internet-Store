import { EmailService } from "@/email";
import { PrismaService } from "@/orm";
import { Injectable, NotFoundException } from "@nestjs/common";
import { UserService } from "../user";
import { generateSecureFourDigitCode, hashData, verifyHash } from "@/helpers";
import { RecoverPasswordDto, VerifyCodeDto } from "@/dto/user";

@Injectable()
export class RecoverPasswordService {
    
    constructor(
        private prisma: PrismaService,
        private emailService: EmailService,
        private userService: UserService,
    ) {}

    async createVerificationCode(email: string) {
        const user = await this.userService.findUserByEmail(email);
        const code = generateSecureFourDigitCode();
        const hashedCode = await hashData(code);
    
        await this.prisma.passwordResetVerification.upsert({
            where: { userId: user.id },
            update: {
                code: hashedCode,
                createdAt: new Date(),
            },
            create: {
                userId: user.id,
                code: hashedCode,
                createdAt: new Date(),
            },
        });
        this.emailService.sendVerificationMailPass (user.email, code);
    
        return user.id;
    }
    
    async compareCodes( userId: string, dto: VerifyCodeDto) {
        const passwordReset = await this.prisma.passwordResetVerification.findUnique({
            where: {
                userId
            }
        })
    
        if (!passwordReset) {
            throw new NotFoundException('resource not found');
        }
    
        const result = await verifyHash(dto.code, passwordReset?.code);
        if (!result) {
            throw new NotFoundException('resource not found');
        }
        await this.prisma.passwordResetVerification.update({
            where: {
                userId
            },
            data: {
                used: true
            }
        })
    }

    async setNewPassword(userId: string, dto: RecoverPasswordDto) {
        const user = await this.userService.findById(userId);

        const hashedNewPassword = await hashData(dto.newPassword);
        await this.prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                password: hashedNewPassword,
            }
        })
    }
}