import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AddCategorySubsetDto {
    @IsNotEmpty({ message: 'parentsID must be required' })
    @ApiProperty({
        type: Number,
        description: 'id of parents category',
        required: true,
    })
    parentsID: number;
}
