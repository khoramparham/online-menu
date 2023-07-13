import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto';
import * as bcrypt from 'bcrypt';
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
    async signUp(dto: AuthDto) {
        try {
            const saltRounds = this.config.get('SALT_ROUNDS');
            const userFound = await this.findUserByPhone(dto.phone);
            if (!!userFound) throw new ForbiddenException('');
            const password = await bcrypt.hash(
                dto.password,
                parseInt(saltRounds),
            );
            const user = await this.prisma.user.create({
                data: {
                    phone: dto.phone,
                    password,
                },
                select: {
                    id: true,
                    phone: true,
                    createdAt: true,
                },
            });
            return user;
        } catch (error) {
            console.log(error);
        }
    }
    async signIn(dto: AuthDto) {
        try {
            const saltRounds = this.config.get('SALT_ROUNDS');
            const user = await this.findUserByPhone(dto.phone);
            const pwMatch = await bcrypt.compareSync(
                user.password,
                dto.password,
            );
            return this.signToken(user.id, user.phone);
        } catch (error) {
            console.log(error);
        }
    }
    async resetPassword(dto: AuthDto) {
        try {
        } catch (error) {}
    }
    async findUserByPhone(phone: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                phone: phone,
            },
        });
        return user;
    }
    signToken(userID: number, phone: string) {
        const payload = {
            sub: userID,
            phone,
        };
        const secret = this.config.get('SALT_ROUNDS');
        const token = this.jwt.signAsync(payload, {
            expiresIn: '15min',
            secret: secret,
        });
        return { access_token: token };
    }
}
