import { ApiProperty } from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsNumber,
    IsString,
    MaxLength,
    maxLength,
} from 'class-validator';

export class updateCategoryDto {
    @IsNotEmpty({ message: 'name required' })
    @IsString({ message: 'name must be string' })
    @MaxLength(50, { message: 'maximum length must be 50 character' })
    @ApiProperty({
        type: String,
        description: 'name of category',
        required: true,
    })
    name: string;
}
