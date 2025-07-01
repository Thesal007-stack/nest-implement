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
import { BooksCategory } from './categories/enity/books-category.entity';
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
      entities: [User, Product, Book, BooksCategory],
      database: 'users',
      synchronize: true,
      logging: true,
    }),
    UsersModule,
    ProductModule,
    BookModule,
  ],
})
export class AppModule {}
