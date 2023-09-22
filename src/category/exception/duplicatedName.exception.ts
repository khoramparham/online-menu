import { HttpException, HttpStatus } from '@nestjs/common';

export class duplicatedNameException extends HttpException {
    constructor() {
        super('name of category duplicated.', HttpStatus.BAD_REQUEST);
    }
}
