import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UploadedFile,
    UseGuards,
    HttpCode,
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiConsumes,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';
import { ProductService } from './product.service';
import { JwtGuard } from 'src/auth/guard';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { Role } from 'src/auth/enum/role.enum';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { uploadFile } from 'src/manage-file/upload-file.decorator';
// Dto
import { CreateProductDto } from './dto/create-product.dto';
import { updateProductDto } from './dto/update-product';

@Controller('product')
@ApiTags('Product Module')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @HttpCode(201)
    @Post('store')
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @ApiBearerAuth('access_token')
    @uploadFile('photo', ['.jpg', '.png', '.webp', '.jpeg', '.gif'])
    @ApiConsumes('multipart/form-data')
    @ApiOperation({ summary: 'create product' })
    @ApiOkResponse({ description: 'product created successful' })
    @ApiNotFoundResponse({ description: 'product not found' })
    async create(
        @Body() dto: CreateProductDto,
        @UploadedFile() file: Express.Multer.File,
    ) {
        return await this.productService.create(dto);
    }

    @HttpCode(200)
    @Get('/getAll')
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @ApiBearerAuth('access_token')
    @ApiOperation({ summary: 'get all products' })
    @ApiOkResponse({ description: 'product found successful' })
    @ApiNotFoundResponse({ description: 'product not found' })
    findAll() {
        return this.productService.findAll();
    }

    @HttpCode(200)
    @Get(':id')
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @ApiBearerAuth('access_token')
    @ApiOperation({ summary: 'found product by ID' })
    @ApiOkResponse({ description: 'product found successful' })
    @ApiNotFoundResponse({ description: 'product not found' })
    findOne(@Param('id') id: string) {
        return this.productService.findOne(+id);
    }

    @HttpCode(200)
    @Patch(':id')
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @ApiBearerAuth('access_token')
    @uploadFile('photo', ['.jpg', '.png', '.webp', '.jpeg', '.gif'])
    @ApiConsumes('multipart/form-data')
    @ApiOperation({ summary: 'update product by ID' })
    @ApiOkResponse({ description: 'product update successful' })
    @ApiNotFoundResponse({ description: 'product not found' })
    update(
        @Param('id') id: string,
        @Body() dto: updateProductDto,
        @UploadedFile() file: Express.Multer.File,
    ) {
        return this.productService.update(+id, dto);
    }

    @HttpCode(200)
    @Delete(':id')
    @UseGuards(JwtGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @ApiBearerAuth('access_token')
    @ApiOperation({ summary: 'create product' })
    @ApiOkResponse({ description: 'product delete successful' })
    @ApiNotFoundResponse({ description: 'product not found' })
    remove(@Param('id') id: string) {
        return this.productService.remove(+id);
    }
}
