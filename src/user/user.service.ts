import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { changeRoleDto } from './dto';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaService) {}
    async changeRoleByAdmin(id: string, dto: changeRoleDto) {
        const user = await this.findUserByID(id);
        if (!user) throw new NotFoundException('کاربر مورد نظر یافت نشد');
        const userUpdated = await this.prisma.user.update({
            where: { id: user.id },
            data: { role: dto.Role },
        });
        return userUpdated;
    }
    async findAllUsers() {
        const users = await this.prisma.user.findMany({
            select: { name: true, phone: true, role: true },
        });
        return users;
    }
    async findUserByID(id: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                id,
            },
        });

        return user;
    }
}
