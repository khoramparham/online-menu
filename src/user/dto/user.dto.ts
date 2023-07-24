import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Role } from 'src/auth/enum/role.enum';

export class changeRoleDto {
    @IsNotEmpty({ message: 'نقش نباید خالی باشد' })
    @ApiProperty({
        type: String,
        required: true,
        enum: ['ADMIN', 'USER'],
        default: 'USER',
    })
    Role: Role;
}
