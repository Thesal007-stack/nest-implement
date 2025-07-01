import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
export class UpdateBookDto {
  @ApiProperty({ description: 'Book title' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: 'Book description', required: false })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({ description: 'Product thumbnail' })
  @IsNotEmpty()
  @IsString()
  thumbnail: string;

  @ApiProperty({ description: 'Product category' })
  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  @Type(() => Number)
  categoryIds: number[];
}
