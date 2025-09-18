import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './enity/book.enity';
import { BooksCategory } from '../categories/entity/books-category.entity';
import { BooksCategoryController } from 'src/categories/categories.controller';
import { BooksCategoryService } from 'src/categories/categories.service';

@Module({
  imports: [TypeOrmModule.forFeature([Book, BooksCategory])],
  providers: [BookService, BooksCategoryService],
  controllers: [BookController, BooksCategoryController],
  exports: [BookService, BooksCategoryService],
})
export class BookModule {}
