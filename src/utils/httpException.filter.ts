import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();
        const statusCode =
            exception instanceof HttpException
                ? status
                : HttpStatus.INTERNAL_SERVER_ERROR;
        const message =
            exception instanceof HttpException
                ? exception.message
                : 'Internal server error';
        response.status(status).json({
            statusCode,
            timestamp: new Date().toISOString(),
            path: request.url,
            message,
        });
    }
}
