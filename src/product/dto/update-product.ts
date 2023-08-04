import { ApiProperty } from '@nestjs/swagger';
import {
    Allow,
    IsNotEmpty,
    IsNumberString,
    IsOptional,
    IsString,
    Matches,
} from 'class-validator';

export class updateProductDto {
    @IsString({ message: 'name must be string' })
    @IsNotEmpty({ message: 'نام محصول نمی تواند خالی باشد' })
    @ApiProperty({
        type: String,
        default: 'محصول جدید',
        description: 'name of the product',
        required: true,
    })
    name: string;

    @IsNotEmpty({ message: 'قیمت نمی تواند خالی باشد' })
    @IsNumberString({ message: 'قیمت باید عدد باشد' })
    @ApiProperty({
        type: String,
        description: 'price of the product',
        required: true,
    })
    price: string;

    @IsString({ message: 'description must be string' })
    @IsOptional({})
    @ApiProperty({
        type: String,
        description: 'description of the product',
        required: false,
    })
    description: string;

    @ApiProperty({
        type: String,
        format: 'binary',
        description: 'photo of the product',
        required: false,
    })
    photo: string;

    @Matches(/(\.png|\.jpg|\.webp|\.jpeg|\.gif)$/, {
        message: 'تصویر ارسال شده صحیح نمیباشد',
    })
    fileName: string;
    @Allow()
    fileUploadPath: string;

    @IsNumberString({ message: 'دسته بندی باید عدد باشد' })
    @IsOptional({})
    @ApiProperty({
        type: String,
        description: 'categoryID of the product',
        required: false,
    })
    categoryID: string;
}
