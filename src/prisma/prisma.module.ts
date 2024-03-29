import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ConfigModule } from '@nestjs/config';

@Module({
    providers: [PrismaService],
    exports: [PrismaService],
    imports: [],
})
export class PrismaModule {}
