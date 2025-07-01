// 5. books-category.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateCategoryDto } from 'src/categories/dto/create-category.dto';
import { BooksCategoryService } from './categories.service';
import { UpdateCategoryDto } from 'src/categories/dto/update-category.dto';
import { ApiBody, ApiResponse } from '@nestjs/swagger';

@Controller('categories')
export class BooksCategoryController {
  constructor(private readonly categoryService: BooksCategoryService) {}

  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiBody({
    type: CreateCategoryDto,
    description: 'Json body create category!',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.createCategory(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.findOne(id);
  }

  @ApiBody({
    type: CreateCategoryDto,
    description: 'Update body Book',
  })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.remove(id);
  }
}
