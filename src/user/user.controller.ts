import {
    Body,
    Controller,
    HttpCode,
    Param,
    Patch,
    Post,
    UseGuards,
    Get,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from 'src/auth/guard';
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiConsumes,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiParam,
    ApiTags,
} from '@nestjs/swagger';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { Role } from 'src/auth/enum/role.enum';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { changeRoleDto } from './dto';

@Controller('user')
@ApiTags('User Module')
export class UserController {
    constructor(private userService: UserService) {}
    @HttpCode(200)
    @Patch('changeRole/:userID')
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @ApiBearerAuth('access_token')
    @ApiOperation({ summary: 'change user role by admin' })
    @ApiConsumes('multipart/form-data')
    @ApiParam({
        name: 'userID',
        required: true,
        description: 'Should be an id of a user that exists in the database',
        type: Number,
    })
    @ApiOkResponse({ description: 'role change successful' })
    @ApiNotFoundResponse({ description: 'user not found' })
    @ApiBadRequestResponse({ description: 'role change failed' })
    async changeRoleByAdmin(
        @Param('userID') id: string,
        @Body() dto: changeRoleDto,
    ) {
        return this.userService.changeRoleByAdmin(id, dto);
    }

    @Get('getAllUsersByAdmin')
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @ApiBearerAuth('access_token')
    @ApiOperation({ summary: 'get all users by admin' })
    @ApiOkResponse({ description: 'all users get successful' })
    async getAllUsersByAdmin() {
        return this.userService.findAllUsers();
    }
}
