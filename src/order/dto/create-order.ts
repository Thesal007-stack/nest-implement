import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsInt, ValidateNested } from 'class-validator';
import { CreateOrderItemDto } from 'src/order-item/dto/create-order-item.dto';
export class CreateOrderDto {
  @ApiProperty({ description: 'customerId' })
  @IsInt()
  customerId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items: CreateOrderItemDto[];
}
