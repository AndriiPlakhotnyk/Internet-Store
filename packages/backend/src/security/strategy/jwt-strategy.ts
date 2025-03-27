import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '@/auth/auth.service';
import { JwtPayload } from './jwt.interface';
import { JwtConfigService } from '@/config/jwt-config';

@Injectable()
export abstract class JwtStrategyBase extends PassportStrategy(Strategy) {
  constructor(
    @Inject(forwardRef(() => AuthService)) protected readonly authService: AuthService,
    jwtConfigService: JwtConfigService,
    strategyName: string,
  ) {
    const secret = JwtStrategyBase.getSecret(strategyName, jwtConfigService);
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  private static getSecret(strategyName: string, jwtConfigService: JwtConfigService): string {
    switch (strategyName) {
      case 'jwt':
        return jwtConfigService.getAccessSecret();
      case 'jwt-refresh':
        return jwtConfigService.getRefreshSecret();
      default:
        throw new Error(`Invalid strategy name: ${strategyName}`);
    }
  }

  async validate(payload: JwtPayload) {
    return this.authService.validateUser(payload.id);
  }
}

