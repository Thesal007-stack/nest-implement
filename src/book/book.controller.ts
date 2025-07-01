import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Param,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BookService } from './book.service';
import { Book } from './enity/book.enity';
import { Sorting, SortingParams } from 'src/decorators/sorting.decorator';
import { CreateBookDto } from './dto/create-book.dto';
import {
  PaginationParams,
  Pagination,
} from 'src/decorators/pagination.decorator';
import { Filtering, FilteringParams } from 'src/decorators/filtering.decorator';
import { PaginatedResource } from 'src/interface/pagination';

@ApiTags('books')
@Controller('books')
export class BookController {
  private readonly logger = new Logger(BookController.name);
  constructor(private readonly bookService: BookService) {}
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiBody({
    type: CreateBookDto,
    description: 'Json body create product!',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Post()
  async create(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return await this.bookService.createBook(createBookDto);
  }

  @Get('all')
  @ApiResponse({ status: 200, description: 'Book existing' })
  async getAll(): Promise<Book[]> {
    return await this.bookService.findAll();
  }

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
    description: 'Sort format: property:direction (e.g., id:asc)',
  })
  @ApiQuery({
    name: 'filter',
    required: false,
    type: String,
    description: 'Filter format: property:rule:value (e.g., title:eq:Scien)',
  })
  @ApiResponse({ status: 200, description: 'Paginated products list' })
  @Get()
  @HttpCode(HttpStatus.OK)
  @Get()
  async getBook(
    @PaginationParams() paginationParams: Pagination,
    @SortingParams(['id', 'title'])
    sort?: Sorting,
    @FilteringParams(['id', 'title'])
    filter?: Filtering,
  ): Promise<PaginatedResource<Partial<Book>>> {
    this.logger.log(
      `REST request to get cities: ${JSON.stringify(paginationParams)}, ${sort as any}, ${filter as any}`,
    );
    return await this.bookService.getBook(paginationParams, sort, filter);
  }
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.bookService.findOne(+id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.bookService.remove(+id);
  }
}
