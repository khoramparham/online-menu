import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './category/category.module';

@Module({
    imports: [
        PrismaModule,
        UserModule,
        AuthModule,
        ConfigModule.forRoot({ isGlobal: true }),
        CategoryModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
