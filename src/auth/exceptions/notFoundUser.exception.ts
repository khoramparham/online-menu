import { HttpException, HttpStatus } from '@nestjs/common';

export class notFoundUserException extends HttpException {
    constructor() {
        super('کاربر یافت نشد', HttpStatus.NOT_FOUND);
    }
}
