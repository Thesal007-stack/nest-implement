// dto/create-order-item.dto.ts
import { IsInt, IsOptional } from 'class-validator';

export class CreateOrderItemDto {
  @IsInt()
  @IsOptional()
  orderId!: number;

  @IsInt()
  productId: number;

  @IsInt()
  quantity: number;
}
