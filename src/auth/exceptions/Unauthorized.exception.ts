import { HttpException, HttpStatus } from '@nestjs/common';

export class UnauthorizedException extends HttpException {
    constructor() {
        super('کد وارد شده صحیح نمی باشد', HttpStatus.UNAUTHORIZED);
    }
}
