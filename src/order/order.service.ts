import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entity/order.entity';
import { Customer } from 'src/customer/entity/customer.entity';
import { CreateOrderDto } from './dto/create-order';
import { Product } from 'src/product/enity/product.enity';
import { OrderItem } from 'src/order-item/enity/order-item.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    try {
      const customer = await this.customerRepository.findOne({
        where: { id: createOrderDto.customerId },
      });
      if (!customer) throw new NotFoundException('Customer not found');
      const order = this.orderRepository.create({
        customer,
        orderDate: Date(),
        items: [],
      });
      for (const itemDto of createOrderDto.items) {
        const product = await this.productRepository.findOne({
          where: { id: itemDto.productId },
        });
        if (!product)
          throw new NotFoundException(
            `Product with ID ${itemDto.productId} not found`,
          );

        const orderItem = this.orderItemRepository.create({
          product,
          quantity: itemDto.quantity,
        });
        order.items.push(orderItem);
      }
      return this.orderRepository.save(order);
    } catch (error) {
      console.log('Create error message:', error);

      throw new error();
    }
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find({
      relations: ['customer', 'items', 'items.product'],
    });
  }
}
