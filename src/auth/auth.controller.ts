import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { AuthDto } from './dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    @Post('singUp')
    signUp(@Body() auth: AuthDto) {
        return this.authService.signUp(auth);
    }
    @Post('singIn')
    signIn(@Body() auth: AuthDto) {
        return this.authService.signIn(auth);
    }
    @Post('resetPassword')
    resetPassword(@Body() auth: AuthDto) {
        return this.authService.resetPassword(auth);
    }
    @Get('find/:phone')
    findUser(@Param() phone) {
        return this.authService.findUserByPhone(phone);
    }
}
