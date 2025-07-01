import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import {
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './enity/product.enity';
import {
  Pagination,
  PaginationParams,
} from 'src/decorators/pagination.decorator';
import { Sorting, SortingParams } from 'src/decorators/sorting.decorator';
import { Filtering, FilteringParams } from 'src/decorators/filtering.decorator';
import { PaginatedResource } from 'src/interface/pagination';

@ApiTags('product')
@Controller('product')
export class ProductController {
  private readonly logger = new Logger(ProductController.name);
  constructor(private readonly productService: ProductService) {}
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBody({
    type: CreateProductDto,
    description: 'Json body create product!',
  })
  @Post()
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productService.create(createProductDto);
  }

  @ApiOperation({
    summary: 'Get all products'
  })
  @ApiResponse({ status: 201, description: 'Product create successfully!' })
  @Get('findAll')
  async findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @ApiOperation({
    summary: 'Get products with pagination, sorting, and filtering',
  })
  @ApiQuery({
    name: 'page',
    required: true,
    type: Number,
    description: 'Page number (starting from 0)',
  })
  @ApiQuery({
    name: 'size',
    required: true,
    type: Number,
    description: 'Items per page (max 100)',
  })
  @ApiQuery({
    name: 'sort',
    required: false,
    type: String,
    description: 'Sort format: property:direction (e.g., price:asc)',
  })
  @ApiQuery({
    name: 'filter',
    required: false,
    type: String,
    description:
      'Filter format: property:rule:value (e.g., product_type:eq:services)',
  })
  @ApiResponse({ status: 200, description: 'Paginated products list' })
  @Get()
  @HttpCode(HttpStatus.OK)
  public async getProducts(
    @PaginationParams() paginationParams: Pagination,
    @SortingParams(['product_name', 'price', 'stock'])
    sort?: Sorting,
    @FilteringParams(['product_name', 'price', 'product_type'])
    filter?: Filtering,
  ): Promise<PaginatedResource<Partial<Product>>> {
    this.logger.log(
      `REST request to get cities: ${JSON.stringify(paginationParams)}, ${sort as any}, ${filter as any}`,
    );
    return await this.productService.getProducts(
      paginationParams,
      sort,
      filter,
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Product | null> {
    return await this.productService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return await this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
