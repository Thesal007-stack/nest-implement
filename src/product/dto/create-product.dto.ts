import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ description: 'Product name' })
  @IsNotEmpty()
  @IsString()
  product_name: string;

  @ApiProperty({ description: 'Product code' })
  @IsNotEmpty()
  @IsString()
  product_code: string;

  @ApiProperty({ description: 'Product type' })
  @IsNotEmpty()
  @IsString()
  product_type: string;

  @ApiProperty({ description: 'Product price' })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({ description: 'Product stock quantity' })
  @IsNotEmpty()
  @IsNumber()
  stock: number;

  @ApiProperty({ description: 'Product description', required: false })
  @IsOptional()
  @IsString()
  description?: string;
}