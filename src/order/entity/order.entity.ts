import { Customer } from '../../customer/entity/customer.entity';
import { OrderItem } from '../../order-item/enity/order-item.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customerId: number;

  @Column()
  orderDate: Date;

  @ManyToOne(() => Customer, (customer) => customer.orders, {
    eager: true,
  })
  customer: Customer;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { cascade: true })
  items: OrderItem[];
}
