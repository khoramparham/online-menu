import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';

@Module({
    imports: [
        PrismaModule,
        UserModule,
        AuthModule,
        ConfigModule.forRoot({ isGlobal: true }),
        CategoryModule,
        ProductModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
