import { HttpException, HttpStatus } from '@nestjs/common';

export class categoryNotFound extends HttpException {
    constructor() {
        super('category not find.', HttpStatus.NOT_FOUND);
    }
}
