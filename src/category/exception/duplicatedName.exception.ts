import { HttpException } from '@nestjs/common';

export class duplicatedNameException extends HttpException {
    constructor() {
        super(
            {
                Status: 400,
                Success: false,
                Message: 'name of category duplicated.',
            },
            400,
        );
    }
}
