import { HttpException, HttpStatus } from '@nestjs/common';

export class notAccessException extends HttpException {
    constructor() {
        super('شما به این قسمت دسترسی ندارید', HttpStatus.UNAUTHORIZED);
    }
}
