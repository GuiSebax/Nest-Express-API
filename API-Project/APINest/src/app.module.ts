import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AddressModule } from './address/address.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [PrismaModule, UsersModule, AuthModule, AddressModule, ProductModule, CategoryModule, OrderModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
