import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(Order)
    private readonly repository: Repository<Order>,
  ) {}

  async findByIdWithRelations(id: string): Promise<Order | null> {
    return this.repository.findOne({
      where: { id },
      relations: { client: true, products: true },
    });
  }

  async create(orderData: Partial<Order>): Promise<Order> {
    const order = this.repository.create(orderData);
    return this.repository.save(order);
  }
}
