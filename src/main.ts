import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
    DocumentBuilder,
    SwaggerDocumentOptions,
    SwaggerModule,
} from '@nestjs/swagger';
import {
    BadRequestException,
    HttpException,
    HttpStatus,
    ValidationPipe,
} from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express/interfaces';
import * as path from 'path';
import { HttpExceptionFilter } from './utils/httpException.filter';
async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.useStaticAssets(path.join(__dirname, '..', 'public'), {
        prefix: '/public/',
    });
    const config = new DocumentBuilder()
        .setTitle('online-menu')
        .setDescription('live menu api')
        .setContact('parham khoram', ' ', 'khoramparham@gmailcom')
        .setVersion('1.0.0.')
        .addServer('http://localhost:3000')
        .addBearerAuth(
            {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
            'access_token',
        )
        .build();
    const options: SwaggerDocumentOptions = {
        deepScanRoutes: true,
    };
    const document = SwaggerModule.createDocument(app, config, options);
    SwaggerModule.setup('api-doc', app, document);
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            stopAtFirstError: true,
            exceptionFactory: (errors) => {
                const result = errors.map((error) => ({
                    message:
                        error.constraints[Object.keys(error.constraints)[0]],
                }));
                return new HttpException(
                    result[0].message,
                    HttpStatus.BAD_REQUEST,
                );
            },
        }),
    );
    await app.listen(3000);
}
bootstrap();
