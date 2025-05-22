import { Inject, Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtConfigService } from '@/config/jwt-config';
import { verifyHash } from '@/helpers';
import { PrismaService } from '@/orm';
import { REFRESH_JWT } from '@/modules/tokens/tokens.module';

@Injectable()
export class RefreshTokenGuard implements CanActivate {
  constructor(
    @Inject(REFRESH_JWT) private readonly jwtService: JwtService,
    private readonly jwtConfigService: JwtConfigService,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Authorization header is missing or invalid');
    }

    const token = authHeader.split(' ')[1];

    const secret = this.jwtConfigService.getRefreshSecret();
    console.log('Secret base64:', Buffer.from(secret).toString('base64'));

    try {
      const decoded = this.jwtService.verify(token, {
        secret: this.jwtConfigService.getRefreshSecret(),
      });

      const userId = decoded.id;

      const currentTime = new Date();
      const expiresAt = new Date(decoded.expiresAt);

      if (currentTime > expiresAt) {
        throw new UnauthorizedException('Refresh token has expired');
      }

      const storedToken = await this.prisma.refreshToken.findUnique({
        where: { userId },
      });

      if (!storedToken) {
        throw new UnauthorizedException('Refresh token not found');
      }

      const isTokenValid = await verifyHash(token, storedToken.hashedToken);
      if (!isTokenValid) {
        throw new UnauthorizedException('Refresh token is invalid');
      }

      request.user = decoded;
      request.refreshToken = token;

      return true;
    } catch (error) {
      console.error('error: ', error);
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }
}
