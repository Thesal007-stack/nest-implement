import { Injectable, Param } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './enity/product.enity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { NotFoundException } from '@nestjs/common';
import { Pagination } from 'src/decorators/pagination.decorator';
import { Sorting } from 'src/decorators/sorting.decorator';
import { Filtering } from 'src/decorators/filtering.decorator';
import { PaginatedResource } from 'src/interface/pagination';
import { getOrder, getWhere } from 'src/helpers/typeorm.helper';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  public async getProducts(
    { page, limit, size, offset }: Pagination,
    sort?: Sorting,
    filter?: Filtering,
  ): Promise<PaginatedResource<Partial<Product>>> {
    const where = filter ? getWhere(filter) : {};
    const order = sort ? getOrder(sort) : {};
    const [data, total] = await this.productRepository.findAndCount({
      where,
      order,
      take: limit,
      skip: offset,
    });
    return {
      totalItems: total,
      data,
      page,
      size,
    };
  }
  async create(createProductDto: CreateProductDto): Promise<Product> {
    try {
      const product = this.productRepository.create(createProductDto);
      return await this.productRepository.save(product);
    } catch (error) {
      console.log('Create product error:', error);
      throw error;
    }
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async findOne(@Param('id') id: string): Promise<Product | null> {
    return this.productRepository.findOne({ where: { id } });
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product | null> {
    await this.productRepository.update(id, updateProductDto);
    return this.productRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    const result = await this.productRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
  }
}
