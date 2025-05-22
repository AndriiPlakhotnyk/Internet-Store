import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { PrismaModule } from '@/orm';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigModule, JwtConfigService } from '@/config/jwt-config';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { CallIsExistMiddleware } from '@/middlewares';


@Module({
    imports: [
        JwtModule.registerAsync({
            imports: [JwtConfigModule],
            useFactory: async (jwtConfigService: JwtConfigService) => ({
                secret: jwtConfigService.getAccessSecret(),
                signOptions: jwtConfigService.getAccessTokenOptions(),
            }),
            inject: [JwtConfigService],
        }),
        PrismaModule,
    ],
    controllers: [ProductController],
    providers: [ProductService],
})

export class ProductModule implements NestModule{
	configure(consumer: MiddlewareConsumer) {
        consumer
          .apply(CallIsExistMiddleware('product'))
          .forRoutes( 
              { path: 'product/product/:id', method: RequestMethod.GET },
              { path: 'product/product/:id', method: RequestMethod.PUT },
              { path: 'product/product/:id', method: RequestMethod.DELETE },
          );
      }
}