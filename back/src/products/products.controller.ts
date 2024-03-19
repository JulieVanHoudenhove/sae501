import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards} from "@nestjs/common";
import {ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {ProductsService} from "./products.service";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {ProductEntity} from "./entities/product.entity";
import {CreateProductDto} from "./dto/create-product.dto";
import {Product as ProductModel} from ".prisma/client";
import {UpdateProductDto} from "./dto/update-product.dto";

@Controller('products')
@ApiTags('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: ProductEntity })
  async create(
      @Body() createProductDto: CreateProductDto
  ): Promise<ProductModel> {
    return new ProductEntity(await this.productsService.create(createProductDto));
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ProductEntity, isArray: true })
  async findAll(): Promise<ProductModel[]> {
    const products = await this.productsService.products({});
    return products.map((product) => new ProductEntity(product))
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: ProductEntity })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ProductModel> {
    return new ProductEntity(await this.productsService.product({id: id}));
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: ProductEntity })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto) {
    return new ProductEntity(await this.productsService.update(id, updateProductDto));
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: ProductEntity })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return new ProductEntity(await this.productsService.remove({ id: id }));
  }
}