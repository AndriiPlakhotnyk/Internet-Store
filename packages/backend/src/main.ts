import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './decorators';
import { ConfigService } from './config/env-config';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableCors({
		origin: ['exp://10.100.102.5:8081'],
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
		allowedHeaders: ['Content-Type', 'Authorization'],
		credentials: true,
	});
	app.useGlobalFilters(new HttpExceptionFilter());
	const configService = app.get(ConfigService);
	const port = configService.getPort();
	await app.listen(port ?? 3031);
	console.log(`Server started on ${port}`);
}
bootstrap();
