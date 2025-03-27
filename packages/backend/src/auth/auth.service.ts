import { JwtConfigService } from "@/config/jwt-config";
import { LoginDto, RegisterDto, VerifyOtpDto } from "@/dto";
import { EmailService } from "@/email";
import { generateRandomToken, generateSecureFourDigitCode, hashData, verifyHash } from "@/helpers";
import { PrismaService } from "@/prisma"; 
import { RegisterResponse, TokensResponse } from "@/types";
import { UserService } from "@/user";
import { 
    BadRequestException,
    ConflictException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
    UnauthorizedException
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
   constructor(
    private readonly prismaService: PrismaService,
    private jwtService: JwtService,
    private readonly userService: UserService,
    private readonly emailService: EmailService,
    private readonly jwtConfigService: JwtConfigService){}

    async generateTokens(id: string): Promise<TokensResponse> {
        const accessToken = this.jwtService.sign(
            { id },
        );
        const refreshToken = this.jwtService.sign(
            { id },
            {
                secret: this.jwtConfigService.getRefreshSecret(),
                expiresIn: this.jwtConfigService.getRefreshTokenOptions().expiresIn,
            }
        );

        const hashedRt = await hashData(refreshToken);
        await this.prismaService.user.update({
            where: { id },
            data: { hashedRt },
        });
        
        return { accessToken, refreshToken };
    }

    async generateVerificationCode(): Promise<string> {
        const verificationCode = generateSecureFourDigitCode();
        console.log('VC: ', verificationCode);

        return verificationCode;
    }

    async login(loginDto: LoginDto): Promise<TokensResponse> {
        const {  email, password } = loginDto;

        const user = await this.prismaService.user.findUnique({
            where: {
                email
            }
        })
        if (!user) {
            throw new UnauthorizedException('user not found')
        }

        const isValidPassword = await verifyHash(password, user.password);
        if (!isValidPassword) {
            throw new UnauthorizedException('Wrong password') 
        }
        if (user.isVerified === false) {
            await this.prismaService.user.update({
                where: { id: user.id },
                data: { verificationCode: await hashData(await this.generateVerificationCode())},
            });

            throw new UnauthorizedException('User is not verified');
        }
        const { accessToken, refreshToken } = await this.generateTokens(user.id);
        
        return {
            accessToken,
            refreshToken,
        }
    }

    async register(registerDto: RegisterDto): Promise<RegisterResponse> {
        const { email, fullName, phoneNumber, shippingAddress, password } = registerDto;

        const existingUser = await this.prismaService.user.findUnique({
            where: { email },
        });
    
        if (existingUser) {
            throw new ConflictException('User with this email already exists');
        }
    
        const hashedPassword = await hashData(password);
        const hashedVerificationCode = await hashData(await this.generateVerificationCode());
        try {
            await this.emailService.sendVerificationEmail(email, hashedVerificationCode)
            await this.prismaService.user.create({
                data: {
                    email,
                    fullName,
                    phoneNumber,
                    shippingAddress,
                    password: hashedPassword,
                    verificationCode: hashedVerificationCode,
                },
            });
            
            return {
                message: 'User registered successfully. Please verify your email.',
                email
            };
        } catch (error) {
            throw new InternalServerErrorException('Error creating user. Please try again later.');
        }
    }

    async verifyOtp(email: string, verifyOtpDto: VerifyOtpDto): Promise<boolean> {
        const user = await this.prismaService.user.findUnique({
            where: {
                email
            },
        });

        if (!user) {
            throw new BadRequestException('Invalid email')
        }

        const isCodeValid = await verifyHash(verifyOtpDto.otpCode, user.verificationCode || '');
        if (!isCodeValid) {
            throw new BadRequestException('otp-code wrong, please check your email');
        }

        await this.prismaService.user.update({
            where: { id: user.id },
            data: { verificationCode: null, isVerified: true },
        });

        return true;
    }

    async requestUpdatePassword(email: string): Promise<void> {
		const user = await this.prismaService.user.findUnique({ where: { email } });
		if (!user) throw new BadRequestException('User not found');

		const token = generateRandomToken();
		const expiresAt = new Date(Date.now() + 1000 * 60 * 60);

		await this.prismaService.passwordResetToken.deleteMany({ where: { userId: user.id } });

		await this.prismaService.passwordResetToken.create({
			data: {
				token,
				expiresAt,
				userId: user.id,
			},
		});

		await this.emailService.sendPasswordRecoverEmail(email, token);
	}

	async updatePassword(token: string, newPassword: string): Promise<void> {
		const resetToken = await this.prismaService.passwordResetToken.findUnique({ where: { token } });
		if (!resetToken || resetToken.expiresAt < new Date()) {
			throw new BadRequestException('Invalid or expired token');
		}

        const user = await this.prismaService.user.findUnique({ where: { id: resetToken.userId }});
        if (!user) {
            throw new NotFoundException('user not found, wrong identificator')
        }
        const isValidPassword = await verifyHash(newPassword, user?.password);
        if (isValidPassword) {
            throw new ConflictException('Your new password must be different from the current one.');
        }

		const hashedPassword = await hashData(newPassword);

		await this.prismaService.user.update({
			where: { id: resetToken.userId },
			data: { password: hashedPassword },
		});

		await this.prismaService.passwordResetToken.delete({ where: { token } });
	}

    async logout(userId: string): Promise<void> {
        await this.prismaService.user.update({
            where: { id: userId },
            data: { hashedRt: null },
        });
    }

    async validateUser(userId: string) {
        return await this.userService.findById(userId);
    }
}

