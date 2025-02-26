import { JwtConfigService } from "@/config/jwt-config";
import { LoginDto, RegisterDto, VerifyOtpDto } from "@/dto";
import { EmailService } from "@/email";
import { generateSecureFourDigitCode, hashData, verifyHash } from "@/helpers";
import { PrismaService } from "@/prisma"; 
import { RegisterResponse, TokensResponse } from "@/types";
import { UserService } from "@/user";
import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
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
    
        return { accessToken, refreshToken };
    }

    async generateVerificationCode(): Promise<string> {
        const verificationCode = generateSecureFourDigitCode();
        console.log('VC: ', verificationCode);

        return await hashData(verificationCode); 
    }

    async login(loginDto: LoginDto): Promise<TokensResponse> {
        const {  email, password } = loginDto;

        const user = await this.prismaService.user.findUnique({
            where: {
                email
            }
        })
        if (!user) {
            throw new NotFoundException('user not found')
        }

        const isValidPassword = await verifyHash(password, user.password);
        if (!isValidPassword) {
            throw new NotFoundException('Wrong password')
            
        }
        if (user.isVerified === false) {
            await this.prismaService.user.update({
                where: { id: user.id },
                data: { verificationCode: await this.generateVerificationCode()},
            });

            throw new NotFoundException('User is not verified');
        }
        const { accessToken, refreshToken } = await this.generateTokens(user.id);
        const hashedRt = await hashData(refreshToken);

        await this.prismaService.user.update({
            where: { id: user.id },
            data: { hashedRt },
        });
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
        const hashedVerificationCode = await this.generateVerificationCode()
        try {
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
            await this.emailService.sendVerificationEmail(email, hashedVerificationCode)
            
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
            throw new ConflictException('Invalid email')
        }

        const isCodeValid = await verifyHash(verifyOtpDto.otpCode, user.verificationCode || '');
        if (!isCodeValid) {
            throw new ConflictException('otp-code wrong, please check your email');
        }

        await this.prismaService.user.update({
            where: { id: user.id },
            data: { verificationCode: null, isVerified: true },
        });

        return true;
    }

    async logout(userId: string): Promise<void> {
        await this.prismaService.user.update({
            where: { id: userId },
            data: { hashedRt: null },
        });
    }

    async validateUser(userId: string) {
        return this.userService.findById(userId);
    }
}

