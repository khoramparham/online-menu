import {
    IsEmail,
    IsEmpty,
    IsNotEmpty,
    IsPhoneNumber,
    IsString,
    Matches,
    MinLength,
    MaxLength,
} from 'class-validator';

export class AuthDto {
    @IsNotEmpty({ message: 'تلفن نباید خالی باشد' })
    @Matches(/^(09){1}[0-9]{9}$/, { message: 'mobile number is not valid.' })
    phone: string;

    @MinLength(6, { message: 'password cannot be less than 6 characters.' })
    @MaxLength(64, { message: 'password cannot be more than 64 characters.' })
    @IsString({ message: 'password must be string.' })
    @IsNotEmpty({ message: 'password is required and must be entered.' })
    password: string;
}
