import { OrderItem } from '../../order-item/enity/order-item.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  product_name: string;

  @Column({ nullable: false, unique: true })
  product_code: string;

  @Column({ nullable: false })
  product_type: string;

  @Column('decimal', { precision: 10, scale: 2, nullable: false })
  price: number;

  @Column({ nullable: false, default: 0 })
  stock: number;

  @Column({ nullable: true })
  description?: string;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
  orderItems: OrderItem[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}
