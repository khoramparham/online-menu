import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(config: ConfigService, private prisma: PrismaService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('ACCESS_TOKEN_SECRET_KEY'),
        });
    }
    async validate(payload: { userID: string; phone: string }) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: payload.userID,
                phone: payload.phone,
            },
        });
        if (!user) throw new UnauthorizedException('کاربر یافت نشد ');
        return user;
    }
}
