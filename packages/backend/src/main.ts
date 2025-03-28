import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthGuard } from './security/guards/auth-guard';
import { ConfigService } from './config/env-config';
import { HttpExceptionFilter } from './decorators';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableCors({
		origin: [
			'http://localhost:5173',
			'exp://10.100.102.9:8081'
		],
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
		allowedHeaders: ['Content-Type', 'Authorization'],
		credentials: true,
	});
	const reflector = app.get(Reflector);
  	app.useGlobalGuards(new AuthGuard(reflector));
	app.useGlobalFilters(new HttpExceptionFilter());
	const configService = app.get(ConfigService);
	const port = configService.getPort();
	await app.listen(port ?? 3031);
	console.log(`Server started on ${port}`);
}
bootstrap();
