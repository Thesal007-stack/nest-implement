import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrderItemService } from './order-item.service';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { OrderItem } from './enity/order-item.entity';

@ApiTags('order-items')
@Controller('order-items')
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}
  @ApiResponse({
    status: 201,
    description: 'Order Item has been create successfully',
  })
  @Post()
  async create(
    @Body() createOrderItemDto: CreateOrderItemDto,
  ): Promise<OrderItem> {
    return this.orderItemService.create(createOrderItemDto);
  }

  @Get()
  async findAll(): Promise<OrderItem[]> {
    return this.orderItemService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.orderItemService.findOne(+id);
  }
}
