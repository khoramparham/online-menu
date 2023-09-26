import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import * as fs from 'fs';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();
        deleteFileInPublic(request.file?.path);
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

function deleteFileInPublic(fileAddress: string) {
    if (fileAddress) {
        const pathFile = fileAddress.replace(/\\/g, '/');
        if (fs.existsSync(pathFile)) fs.unlinkSync(pathFile);
    }
}
