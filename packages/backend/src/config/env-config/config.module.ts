import { Global, Module } from '@nestjs/common';
import { ConfigModule as EnvConfigModule } from '@nestjs/config';
import { ConfigService } from './config.service';

@Global()
@Module({
  imports: [
    EnvConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['../../env'],
      ignoreEnvFile: false,
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
