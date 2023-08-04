import { HttpException } from '@nestjs/common';

export class notMatchFormatException extends HttpException {
    constructor() {
        super(
            {
                Status: 400,
                Success: false,
                Message: 'فرمت ارسال شده صحیح نمی باشد',
            },
            400,
        );
    }
}
