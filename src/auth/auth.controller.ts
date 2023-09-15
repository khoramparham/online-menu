import { Controller, Post, Body, UseGuards, HttpCode } from '@nestjs/common';
import { checkOtpDto, getOtpDto, refreshTokenDto } from './dto';
import { AuthService } from './auth.service';
import {
    ApiBody,
    ApiCreatedResponse,
    ApiForbiddenResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { GetUser } from './decorator';
import { RefreshJwtGuard } from './guard/refreshJwt.guard';

@ApiTags('Authentication Module')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    @HttpCode(201)
    @Post('getOtp')
    @ApiCreatedResponse({ description: 'Created Successfully' })
    @ApiForbiddenResponse({ description: 'Unauthorized Request' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized Request' })
    getOtp(@Body() dto: getOtpDto) {
        return this.authService.getOtp(dto);
    }

    @HttpCode(200)
    @Post('checkOtp')
    @ApiForbiddenResponse({ description: 'Unauthorized Request' })
    @ApiOkResponse({ description: 'authorized accepted' })
    @ApiForbiddenResponse({ description: 'Unauthorized Request' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized Request' })
    checkOtp(@Body() dto: checkOtpDto) {
        return this.authService.checkOtp(dto);
    }

    @HttpCode(200)
    @Post('refreshToken')
    @ApiOperation({ summary: 'get new access token' })
    @ApiOkResponse({ description: 'new access token created' })
    @ApiForbiddenResponse({ description: 'Unauthorized Request' })
    @ApiBody({ type: refreshTokenDto })
    @UseGuards(RefreshJwtGuard)
    refreshToken(@GetUser() user) {
        return this.authService.refreshToken(user.id, user.phone);
    }
}
