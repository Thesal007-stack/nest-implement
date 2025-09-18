// src/categories/categories.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BooksCategory } from 'src/categories/entity/books-category.entity';
import { BooksCategoryService } from './categories.service';
import { BooksCategoryController } from './categories.controller';

@Module({
  imports: [TypeOrmModule.forFeature([BooksCategory])],
  controllers: [BooksCategoryController],
  providers: [BooksCategoryService],
  exports: [BooksCategoryController],
})
export class CategoriesModule {}
