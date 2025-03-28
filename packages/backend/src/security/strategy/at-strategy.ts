import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { JwtStrategyBase } from "./jwt-strategy";
import { AuthService } from "@/auth/auth.service";
import { JwtConfigService } from "@/config/jwt-config";

@Injectable()
export class AtStrategy extends JwtStrategyBase {
  constructor(
    @Inject(forwardRef(() => AuthService)) authService: AuthService,
    jwtConfigService: JwtConfigService,
  ) {
    super(authService, jwtConfigService, 'jwt');
  }
}