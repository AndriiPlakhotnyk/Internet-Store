import { JwtConfigService } from "@/config/jwt-config";
import { convertExpiresInToSeconds, hashData, verifyHash } from "@/helpers";
import { PrismaService } from "@/orm";
import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { REFRESH_JWT } from "./tokens.module";

@Injectable()
export class RefreshService {
    constructor(
        @Inject(REFRESH_JWT) private readonly jwtService: JwtService,
        private prisma: PrismaService,
        private jwtConfigService: JwtConfigService,
    ) {}

    async generateToken(id: string): Promise<string> {
        const expiresIn = this.jwtConfigService.getRefreshTokenOptions().expiresIn;
        const expiresAt = new Date();
        expiresAt.setSeconds(expiresAt.getSeconds() + convertExpiresInToSeconds(expiresIn));
      
        const refreshToken = this.jwtService.sign(
          { id, expiresAt: expiresAt.toISOString() }
        );
        const hashedRefreshToken = await hashData(refreshToken);
        this.saveRefreshToken(id, hashedRefreshToken, expiresAt);
      
        return refreshToken ;
      }

    async saveRefreshToken(userId: string, newHashedToken: string, expiresAt: Date): Promise<void>{
        await this.prisma.refreshToken.upsert({
            where: { userId },
            update: {
              hashedToken: newHashedToken,
              expiresAt
            },
            create: {
              userId: userId,
              hashedToken: newHashedToken,
              expiresAt,
            },
        });
    }

    async logout(userId: string, refreshToken: string) {
        const storedToken = await this.prisma.refreshToken.findUnique({
          where: { userId },
        });
      
        const isValid = storedToken && await verifyHash(refreshToken, storedToken.hashedToken);
        if (!isValid) {
          throw new UnauthorizedException('Invalid token');
        }
      
        await this.prisma.refreshToken.delete({ where: { userId } });
    }
}