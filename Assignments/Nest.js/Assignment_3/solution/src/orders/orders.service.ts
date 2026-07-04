import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { ProductsService } from '../products/products.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly productsService: ProductsService,
  ) {}

  async findById(id: string): Promise<Order> {
    const order = await this.ordersRepository.findByIdWithRelations(id);
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }

  async create(createOrderDto: CreateOrderDto, client: User): Promise<Order> {
    const products = await this.productsService.findByIds(createOrderDto.productIds);

    if (products.length !== createOrderDto.productIds.length) {
      throw new BadRequestException('One or more products not found');
    }

    return this.ordersRepository.create({
      amount: createOrderDto.amount,
      longitude: createOrderDto.longitude,
      latitude: createOrderDto.latitude,
      paymentMethod: createOrderDto.paymentMethod,
      client,
      products,
    });
  }
}
