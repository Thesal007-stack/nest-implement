import { Injectable, NotFoundException } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './enity/book.enity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BooksCategory } from '../categories/enity/books-category.entity';
import { Pagination } from 'src/decorators/pagination.decorator';
import { Sorting } from 'src/decorators/sorting.decorator';
import { Filtering } from 'src/decorators/filtering.decorator';
import { PaginatedResource } from 'src/interface/pagination';
import { getOrder, getWhere } from 'src/helpers/typeorm.helper';
@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    @InjectRepository(BooksCategory)
    private readonly categoryRepository: Repository<BooksCategory>,
  ) {}

  async getBook(
    { page, limit, size, offset }: Pagination,
    sort?: Sorting,
    filter?: Filtering,
  ): Promise<PaginatedResource<Partial<Book>>> {
    const where = filter ? getWhere(filter) : {};
    const order = sort ? getOrder(sort) : {};
    const [ data, total ] = await this.bookRepository.findAndCount({
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
    }
  }

  async createBook(createBookDto: CreateBookDto): Promise<Book> {
    const categories = await this.categoryRepository.findBy({
      id: In(createBookDto.categoryIds),
    });

    if (categories.length !== createBookDto.categoryIds.length) {
      throw new NotFoundException('One or more categories not found.');
    }
    const book = this.bookRepository.create({
      title: createBookDto.title,
      description: createBookDto.description,
      thumbnail: createBookDto.thumbnail,
      category: categories,
    });
    return await this.bookRepository.save(book);
  }

  async findAll(): Promise<Book[]> {
    return this.bookRepository.find({ relations: ['category'] });
  }

  async findOne(id: number): Promise<Book | null> {
    const book = await this.bookRepository.findOne({
      where: { id },
      relations: ['category'],
    });

    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return book;
  }

  async update(id: number, updateBookDto: UpdateBookDto): Promise<Book | null> {
    await this.bookRepository.update(id, updateBookDto);
    return this.bookRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    const result = await this.bookRepository.delete(id);
    
    if (result.affected === 0) {
      throw new NotFoundException(`Book with ID ${id} not found`)
    }
  }
}
