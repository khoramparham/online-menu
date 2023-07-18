import { ApiProperty } from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsString,
    Matches,
    MinLength,
    MaxLength,
    IsInt,
    isNotEmpty,
} from 'class-validator';

export class getOtpDto {
    @IsNotEmpty({ message: 'تلفن نباید خالی باشد' })
    @Matches(/^(09){1}[0-9]{9}$/, { message: 'mobile number is not valid.' })
    @ApiProperty({ type: String, description: 'mobile phone', required: true })
    phone: string;
}
export class checkOtpDto {
    @IsNotEmpty({ message: 'تلفن نباید خالی باشد' })
    @Matches(/^(09){1}[0-9]{9}$/, { message: 'mobile number is not valid.' })
    @ApiProperty({ type: String, description: 'mobile phone', required: true })
    phone: string;

    @IsInt({ message: 'otp must be string.' })
    @IsNotEmpty({ message: 'otp is required and must be entered.' })
    @ApiProperty({
        type: Number,
        required: true,
    })
    otp: number;
}
export class refreshTokenDto {
    @IsString({ message: 'access_token must be string.' })
    @IsNotEmpty({ message: 'access_token must be required' })
    @ApiProperty({
        type: String,
        required: true,
    })
    refresh_token: string;
}
