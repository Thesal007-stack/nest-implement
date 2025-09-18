import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderItem } from './enity/order-item.entity';
import { Order } from 'src/order/entity/order.entity';
import { Product } from 'src/product/enity/product.enity';
import { CreateOrderItemDto } from './dto/create-order-item.dto';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  // Retrieve all order items
  findAll(): Promise<OrderItem[]> {
    return this.orderItemRepository.find({ relations: ['order', 'product'] });
  }

  async findOne(id: number): Promise<OrderItem> {
    const item = await this.orderItemRepository.findOne({
      where: { id },
      relations: ['order', 'product'],
    });
    if (!item) {
      throw new NotFoundException(`OrderItem with id ${id} not found`);
    }
    return item;
  }

  async create(dto: CreateOrderItemDto): Promise<OrderItem> {
    try {
      console.log('DTO:', dto);

      const order = await this.orderRepository.findOneBy({ id: dto.orderId });
      if (!order) throw new Error('Order not found');

      const product = await this.productRepository.findOneBy({
        id: dto.productId,
      });
      if (!product) throw new Error('Product not found');

      const orderItem = this.orderItemRepository.create({
        order,
        product,
        quantity: dto.quantity,
      });

      const savedItem = await this.orderItemRepository.save(orderItem);
      console.log('Saved OrderItem:', savedItem);
      return savedItem;
    } catch (err) {
      console.error('🔥 ERROR:', err); // ✅ This will log the real TypeError
      throw new InternalServerErrorException(err.message(''));
    }
  }
}
