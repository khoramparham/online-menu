import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { categoryNotFound, duplicatedNameException } from './exception';
import { AddCategorySubsetDto, CreateCategoryDto } from './dto';

@Injectable()
export class CategoryService {
    constructor(private prisma: PrismaService) {}
    async create(dto: CreateCategoryDto) {
        const categoryDuplicated = await this.findByName(dto.name);
        if (!categoryDuplicated) throw new duplicatedNameException();
        const category = await this.prisma.category.create({
            data: { name: dto.name },
        });
        return category;
    }

    async findAll() {
        const allCategory = await this.prisma.category.findMany({
            orderBy: { id: 'asc' },
            include: { subParents: true, parents: true },
        });
        if (!allCategory) throw new categoryNotFound();
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
        if (!category) throw new categoryNotFound();
        return category;
    }

    async addCategorySubset(id: number, dto: AddCategorySubsetDto) {
        const category = await this.findOneByID(id);
        const updatedCategory = await this.prisma.category.update({
            where: { id: category.id },
            data: {
                parentsID: dto.parentsID,
            },
            include: { subParents: true, parents: true },
        });
        return updatedCategory;
    }

    async remove(id: number) {
        const category = await this.findOneByID(id);
        const deletedCategory = await this.prisma.category.delete({
            where: { id: category.id },
        });
        return deletedCategory;
    }
}
