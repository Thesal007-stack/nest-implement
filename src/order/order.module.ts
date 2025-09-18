import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entity/order.entity';
import { Customer } from 'src/customer/entity/customer.entity';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Product } from 'src/product/enity/product.enity';
import { OrderItem } from 'src/order-item/enity/order-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Customer, Product, OrderItem])],
  providers: [OrderService],
  controllers: [OrderController],
  exports: [OrderService],
})
export class OrderModule {}
