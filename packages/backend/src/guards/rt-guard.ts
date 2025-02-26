import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtConfigService } from '@/config/jwt-config';

@Injectable()
export class RefreshTokenGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly jwtConfigService: JwtConfigService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization']?.split(' ')[1];

    if (!token) {
      throw new Error('Refresh token not found');
    }

    try {
      const decoded = this.jwtService.verify(token, {
        secret: this.jwtConfigService.getRefreshSecret(),
      });
      request.user = decoded;
      return true;
    } catch (error) {
      throw new Error('Invalid or expired refresh token');
    }
  }
}
