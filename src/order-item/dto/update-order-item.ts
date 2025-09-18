// dto/create-order-item.dto.ts
import { IsInt } from 'class-validator';

export class UpdateOrderItemDto {
  @IsInt()
  orderId: number;

  @IsInt()
  productId: number;

  @IsInt()
  quantity: number;
}
