import { EmailService } from "@/email";
import { convertExpiresInToSeconds, generateSecureFourDigitCode, hashData, verifyHash } from "@/helpers";
import { RegisterResponse, TokenResponse } from "@/types";
import { UserService } from "@/modules/user";
import { 
    BadRequestException,
    ConflictException,
    Inject,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
    UnauthorizedException
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { LoginDto, RegisterDto, VerifyOtpDto } from "@/dto/user";
import { RefreshService } from "../tokens/refresh-token.service";
import { ACCESS_JWT } from "../tokens/tokens.module";


@Injectable()
export class AuthService {
    constructor(
        @Inject(ACCESS_JWT) private readonly jwtService: JwtService,
        private readonly userService: UserService,
        private readonly emailService: EmailService,
        private readonly refreshService: RefreshService,
    ){}

    async generateTokens(id: string): Promise<TokenResponse> {
        const user = await this.userService.findById(id);
        const accessToken = this.jwtService.sign(
            { id, role: user.role },
        );

        const refreshToken = await this.refreshService.generateToken(user.id)
        
        return { accessToken, refreshToken };
    }

    async login(loginDto: LoginDto): Promise<TokenResponse> {
        const {  email, password } = loginDto;

        const user = await this.userService.findUserByEmail(email);

        const isValidPassword = await verifyHash(password, user.password);
        if (!isValidPassword) {
            throw new UnauthorizedException('User not found'); 
        }
        if (!user.isVerified) {
            const verificationCode = generateSecureFourDigitCode();
            const hashedVerificationCode = await hashData(verificationCode);
            await this.emailService.sendVerificationMail(email, verificationCode);
            await this.userService.updateVerificationCode(user.id, hashedVerificationCode);

            throw new UnauthorizedException('User is not verified');
        }
        const { accessToken, refreshToken } = await this.generateTokens(user.id);
        
        return { accessToken, refreshToken }
    }

    async register(registerDto: RegisterDto): Promise<RegisterResponse> {
        const { email, fullName, phoneNumber, shippingAddress, password } = registerDto;

        try {
            const existingUser = await this.userService.findUserByEmail(email);
            if (existingUser) {
                throw new ConflictException('User with this email already exists');
            }
        } catch (error) {
            if (!(error instanceof NotFoundException)) throw error;
        }
    
        const hashedPassword = await hashData(password);
        const verificationCode = generateSecureFourDigitCode();
        const hashedVerificationCode = await hashData(verificationCode);
        try {
            await this.emailService.sendVerificationMail(email, verificationCode);
            await this.userService.createUser({
                email,
                fullName,
                phoneNumber,
                shippingAddress,
                hashedPassword,
                hashedVerificationCode
            })
            
            return {
                message: 'User registered successfully. Please verify your email.',
                email,
            };
        } catch (error) {
            throw new InternalServerErrorException('Error creating user. Please try again later.');
        }
    }

    async verifyOtp(email: string, verifyOtpDto: VerifyOtpDto): Promise<boolean> {
        const user = await this.userService.findUserByEmail(email);

        const isCodeValid = await verifyHash(verifyOtpDto.otpCode, user.verificationCode || '');
        if (!isCodeValid) {
            throw new BadRequestException('otp-code wrong, please check your email');
        }

        await this.userService.userVerification(user.id);

        return true;
    }

    async logout(userId: string, refreshToken: string ): Promise<void> {
        return this.refreshService.logout(userId, refreshToken);
    }

    async validateUser(userId: string) {
        return await this.userService.findById(userId);
    }
}

