import {
    HttpStatus,
    Injectable,
    UnauthorizedException,
    ForbiddenException,
} from '@nestjs/common';
import { getOtpDto, checkOtpDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt/dist';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
        private config: ConfigService,
    ) {}

    async getOtp(dto: getOtpDto) {
        try {
            const OtpCode = this.createRandomNumberForOTP();
            const user = await this.createUser(dto.phone, OtpCode);
            return user;
        } catch (error) {
            console.log(error);
        }
    }
    async checkOtp(dto: checkOtpDto) {
        try {
            const user = await this.findUserByPhone(dto.phone);
            if (!user) throw new UnauthorizedException('کاربر یافت نشد');
            if (user.otpCode != dto.otp)
                throw new UnauthorizedException('کد ارسال شده اشتباه است');
            const now = new Date().getTime();
            if (parseInt(user.otpExpiresIn) < now)
                throw new UnauthorizedException('کد ارسال شده منقضی شده است');
            const access_token = await this.signAccessToken(
                user.id,
                user.phone,
            );
            const refresh_token = await this.signRefreshToken(
                user.id,
                user.phone,
            );
            return { access_token, refresh_token };
        } catch (error) {
            console.log(error);
        }
    }
    async refreshToken(user) {
        const token = await this.signAccessToken(user.id, user.phone);
        return { refresh_token: token };
    }
    async createUser(phone: string, otpCode: number) {
        try {
            const now = new Date().getTime();

            const user = await this.findUserByPhone(phone);
            if (user) {
                if (parseInt(user.otpExpiresIn) > now) {
                    throw new ForbiddenException(
                        'کد اعتبار سنجی قبلی هنوز منقضی نشده است',
                    );
                }
                return await this.prisma.user.update({
                    where: { phone: phone },
                    data: {
                        otpCode: otpCode,
                        otpExpiresIn: (now + 120000).toString(),
                    },
                });
            }
            return await this.prisma.user.create({
                data: {
                    phone,
                    otpCode,
                    otpExpiresIn: (now + 120000).toString(),
                },
            });
        } catch (error) {
            console.log(error);
        }
    }
    createRandomNumberForOTP() {
        return Math.floor(Math.random() * 89999) + 10000;
    }
    async findUserByPhone(phone: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                phone: phone,
            },
        });

        return user;
    }
    signAccessToken(userID: number, phone: string) {
        const payload = {
            sub: userID,
            phone,
        };
        const secret = this.config.get('ACCESS_TOKEN_SECRET_KEY');
        const token = this.jwt.sign(payload, {
            secret: secret,
            expiresIn: '15min',
        });
        return token;
    }
    signRefreshToken(userID: number, phone: string) {
        const payload = {
            sub: userID,
            phone,
        };
        const secret = this.config.get('REFRESH_TOKEN_SECRET_KEY');
        const token = this.jwt.sign(payload, {
            secret: secret,
            expiresIn: '1y',
        });
        return token;
    }
}
