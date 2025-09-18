/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { User } from './users/entity/user.entity';
import { ProductModule } from './product/product.module';
import { Product } from './product/enity/product.enity';
import { BookModule } from './book/book.module';
import { Book } from './book/enity/book.enity';
import { BooksCategory } from './categories/entity/books-category.entity';
import { CustomerModule } from './customer/customer.module';
import { Customer } from './customer/entity/customer.entity';
import { Order } from './order/entity/order.entity';
import { OrderModule } from './order/order.module';
import { OrderItemModule } from './order-item/order-item.module';
import { OrderItem } from './order-item/enity/order-item.entity';
import { FolderModule } from './folder/folder.module';
import { Folder } from './folder/entities/folder.entity';
import { FileModule } from './file/file.module';
import { File } from './file/entities/file.entity';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: '@Mon1016',
      username: 'postgres',
      entities: [
        User,
        Product,
        Book,
        BooksCategory,
        Customer,
        Order,
        OrderItem,
        Folder,
        File
      ],
      database: 'users',
      synchronize: true,
      logging: true,
    }),
    UsersModule,
    ProductModule,
    BookModule,
    OrderModule,
    CustomerModule,
    OrderItemModule,
    FolderModule,
    FileModule
  ],
})
export class AppModule {}
