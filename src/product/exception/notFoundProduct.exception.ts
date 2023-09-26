import { HttpException, HttpStatus } from '@nestjs/common';

export class productNotFound extends HttpException {
    constructor() {
        super('محصولی یافت نشد', HttpStatus.NOT_FOUND);
    }
}
