import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { categoryNotFound, duplicatedNameException } from './exception';
import {
    AddCategorySubsetDto,
    CreateCategoryDto,
    updateCategoryDto,
} from './dto';

@Injectable()
export class CategoryService {
    constructor(private prisma: PrismaService) {}
    async create(dto: CreateCategoryDto) {
        const category = await this.prisma.category.create({
            data: { name: dto.name },
        });
        return category;
    }

    async findAll() {
        const allCategory = await this.prisma.category.findMany({
            orderBy: { id: 'asc' },
            include: { childrens: true, parents: false },
        });
        if (!allCategory || allCategory.length == 0)
            throw new categoryNotFound();
        return allCategory;
    }

    async findOneByID(id: number) {
        const category = await this.prisma.category.findUnique({
            where: { id: id },
        });
        if (!category) throw new categoryNotFound();
        return category;
    }

    async findByName(name: string) {
        const category = await this.prisma.category.findMany({
            where: { name: { contains: name } },
        });
        if (!category || category.length == 0) throw new categoryNotFound();
        return category;
    }

    async updateCategory(id: number, dto: updateCategoryDto) {
        const category = await this.findOneByID(id);
        const updatedCategory = await this.prisma.category.update({
            where: { id: category.id },
            data: {
                name: dto.name,
            },
            include: { childrens: true, parents: false },
        });
        return updatedCategory;
    }
    async addCategorySubset(id: number, dto: AddCategorySubsetDto) {
        const category = await this.findOneByID(id);
        const updatedCategory = await this.prisma.category.update({
            where: { id: category.id },
            data: {
                childrens: { connect: { id: dto.childrenID } },
            },
            include: { childrens: true, parents: false },
        });
        return updatedCategory;
    }
    async removeCategorySubset(id: number, dto: AddCategorySubsetDto) {
        const category = await this.findOneByID(id);
        const deletedCategory = await this.prisma.category.update({
            where: { id: category.id },
            data: {
                childrens: { disconnect: { id: dto.childrenID } },
            },
            include: { childrens: true, parents: false },
        });
        return deletedCategory;
    }

    async remove(id: number) {
        const category = await this.findOneByID(id);
        const deletedCategory = await this.prisma.category.delete({
            where: { id: category.id },
        });
        return deletedCategory;
    }
}
