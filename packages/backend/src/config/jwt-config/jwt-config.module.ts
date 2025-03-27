import { Module, Global } from '@nestjs/common';
import { JwtConfigService } from './jwt.config.service';

@Global()
@Module({
  imports: [JwtConfigModule],
  providers: [JwtConfigService],
  exports: [JwtConfigService],
})
export class JwtConfigModule {}
