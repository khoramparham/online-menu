import { HttpException } from '@nestjs/common';

export class categoryNotFound extends HttpException {
    constructor() {
        super(
            {
                Status: 404,
                Success: false,
                Message: 'category not find.',
            },
            404,
        );
    }
}
