import { HttpException, HttpStatus } from '@nestjs/common';

export class expiredOTPException extends HttpException {
    constructor() {
        super('کد ارسال شده منقضی شده است', HttpStatus.BAD_REQUEST);
    }
}

export class notExpiredOTPException extends HttpException {
    constructor() {
        super('کد اعتبار سنجی قبلی هنوز منقضی نشده است', HttpStatus.FORBIDDEN);
    }
}
