import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class AddCategorySubsetDto {
    @IsNotEmpty({ message: 'parentsID must be required' })
    @ApiProperty({
        type: Number,
        description: 'id of parents category',
        required: true,
    })
    childrenID: number;
}
