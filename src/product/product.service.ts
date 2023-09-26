import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as path from 'path';
import { productNotFound } from './exception/notFoundProduct.exception';
import { updateProductDto } from './dto/update-product';
import { deleteInvalidPropertyInObject } from 'src/utils/deleteInvalidProperty';
@Injectable()
export class ProductService {
    constructor(private readonly prisma: PrismaService) {}
    async create(dto: CreateProductDto) {
        dto.photo = path
            .join(dto.fileUploadPath, dto.fileName)
            .replace(/\\/g, '/');
        const product = await this.prisma.product.create({
            data: {
                name: dto.name,
                price: +dto.price,
                description: dto.description,
                photo: dto.photo,
                categoryID: +dto.categoryID,
            },
        });
        return product;
    }

    async findAll() {
        const product = await this.prisma.product.findMany({
            include: { category: true },
        });
        if (!product) throw new productNotFound();
        return product;
    }

    async findOne(id: number) {
        const product = await this.prisma.product.findUnique({
            where: { id: id },
            include: { category: true },
        });
        if (!product) throw new productNotFound();
        return product;
    }

    async update(id: number, dto: updateProductDto) {
        const productFounded = await this.findOne(id);
        const product = {
            name: dto.name,
            price: +dto.price,
            description: dto.description,
            photo: dto.photo,
            categoryID: +dto.categoryID,
        };
        deleteInvalidPropertyInObject(product);
        const updatedProduct = await this.prisma.product.update({
            where: { id: productFounded.id },
            data: product,
        });
        return updatedProduct;
    }

    async remove(id: number) {
        const product = await this.findOne(id);
        const deletedProduct = await this.prisma.product.delete({
            where: { id: product.id },
        });
        return deletedProduct;
    }
}
