import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, Inject, forwardRef } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtConfigService } from '@/config/jwt-config';
import { AuthService } from '@/auth/auth.service';
import { verifyHash } from '@/helpers';

@Injectable()
export class RefreshTokenGuard implements CanActivate {
  constructor(
    @Inject(forwardRef(() => AuthService))private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private readonly jwtConfigService: JwtConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Authorization header is missing or invalid');
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = this.jwtService.verify(token, {
        secret: this.jwtConfigService.getRefreshSecret(),
      });

      const user = await this.authService.validateUser(decoded.id);
      if (!user || !user.hashedRt) {
        throw new UnauthorizedException('Refresh token is invalid');
      }

      const isTokenValid = await verifyHash(token, user.hashedRt);
      if (!isTokenValid) {
        throw new UnauthorizedException('Refresh token is invalid');
      }

      request.user = decoded;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }
}
