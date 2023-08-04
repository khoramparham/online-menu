import { HttpException } from '@nestjs/common';

export class productNotFound extends HttpException {
    constructor() {
        super(
            {
                Status: 404,
                Success: false,
                Message: 'محصولی یافت نشد',
            },
            404,
        );
    }
}
