import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
    DocumentBuilder,
    SwaggerDocumentOptions,
    SwaggerModule,
} from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const config = new DocumentBuilder()
        .setTitle('online-menu')
        .setDescription('live menu api')
        .setContact('parham khoram', ' ', 'khoramparham@gmailcom')
        .setVersion('1.0.0.')
        .addServer('http://localhost:3000')
        .addBearerAuth(
            { type: 'http', scheme: 'bearer', bearerFormat: 'Bearer' },
            'access-token',
        )
        .build();
    const options: SwaggerDocumentOptions = {
        deepScanRoutes: true,
    };
    const document = SwaggerModule.createDocument(app, config, options);
    SwaggerModule.setup('api-doc', app, document);

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
        }),
    );
    await app.listen(3000);
}
bootstrap();
