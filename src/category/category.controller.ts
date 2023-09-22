import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    HttpCode,
    UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';

import {
    ApiBearerAuth,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';
import {
    CreateCategoryDto,
    AddCategorySubsetDto,
    updateCategoryDto,
} from './dto';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { JwtGuard } from 'src/auth/guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Role } from 'src/auth/enum/role.enum';

@Controller('category')
@ApiTags('Category Module')
export class CategoryController {
    constructor(private categoryService: CategoryService) {}

    @Post('createCategory')
    @HttpCode(201)
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @ApiBearerAuth('access_token')
    @ApiOkResponse({ description: 'category create successfully' })
    create(@Body() createCategoryDto: CreateCategoryDto) {
        return this.categoryService.create(createCategoryDto);
    }

    @Get('getAllCategory')
    @HttpCode(200)
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @ApiBearerAuth('access_token')
    @ApiOkResponse({ description: 'category find successfully' })
    @ApiNotFoundResponse({ description: 'category not find' })
    findAll() {
        return this.categoryService.findAll();
    }

    @Get('getByID/:id')
    @HttpCode(200)
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @ApiBearerAuth('access_token')
    @ApiOperation({ summary: 'get category by id' })
    @ApiOkResponse({ description: 'category find successfully' })
    @ApiNotFoundResponse({ description: 'category not find' })
    findOne(@Param('id') id: string) {
        return this.categoryService.findOneByID(+id);
    }
    @Get('getByName/:name')
    @HttpCode(200)
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @ApiBearerAuth('access_token')
    @ApiOperation({ summary: 'get category by name' })
    @ApiOkResponse({ description: 'category find successfully' })
    @ApiNotFoundResponse({ description: 'category not find' })
    findByName(@Param('name') name: string) {
        return this.categoryService.findByName(name);
    }

    @Patch('updateCategory/:id')
    @HttpCode(200)
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @ApiBearerAuth('access_token')
    @ApiOperation({ summary: 'category update' })
    @ApiOkResponse({ description: 'category updated successfully' })
    @ApiNotFoundResponse({ description: 'category not find' })
    update(@Param('id') id: number, @Body() dto: updateCategoryDto) {
        return this.categoryService.updateCategory(+id, dto);
    }

    @Patch('addCategorySubset/:id')
    @HttpCode(200)
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @ApiBearerAuth('access_token')
    @ApiOperation({ summary: 'add category children' })
    @ApiOkResponse({ description: 'category children added successfully' })
    @ApiNotFoundResponse({ description: 'category not find' })
    addCategorySubset(
        @Param('id') id: number,
        @Body() dto: AddCategorySubsetDto,
    ) {
        return this.categoryService.addCategorySubset(+id, dto);
    }

    @Delete('deleteSubsetCategory/:categoryID')
    @HttpCode(200)
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @ApiBearerAuth('access_token')
    @ApiOperation({ summary: 'delete category' })
    @ApiOkResponse({ description: 'category subset deleted successfully' })
    @ApiNotFoundResponse({ description: 'category not find' })
    removeCategorySubset(
        @Param('categoryID') id: string,
        @Body() dto: AddCategorySubsetDto,
    ) {
        return this.categoryService.removeCategorySubset(+id, dto);
    }

    @Delete('deleteCategory/:categoryID')
    @HttpCode(200)
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @ApiBearerAuth('access_token')
    @ApiOperation({ summary: 'delete category' })
    @ApiOkResponse({ description: 'category deleted successfully' })
    @ApiNotFoundResponse({ description: 'category not find' })
    remove(@Param('categoryID') id: string) {
        return this.categoryService.remove(+id);
    }
}
