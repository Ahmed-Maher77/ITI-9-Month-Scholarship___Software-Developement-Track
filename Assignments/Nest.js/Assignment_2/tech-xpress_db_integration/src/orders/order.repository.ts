import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Order } from './order.entity';

@Injectable()
export class OrderRepository {
  private repo: Repository<Order>;

  constructor(private dataSource: DataSource) {
    this.repo = this.dataSource.getRepository(Order);
  }

  async findAll(
    filters?: { clientId?: number; paymentMethod?: 'Cash' | 'Visa' },
  ): Promise<Order[]> {
    const query = this.repo.createQueryBuilder('order');

    if (filters?.clientId) {
      query.andWhere('order.clientId = :clientId', {
        clientId: filters.clientId,
      });
    }

    if (filters?.paymentMethod) {
      query.andWhere('order.paymentMethod = :paymentMethod', {
        paymentMethod: filters.paymentMethod,
      });
    }

    return query.getMany();
  }

  async findById(id: string): Promise<Order | null> {
    return this.repo.findOneBy({ id });
  }

  async createOrder(data: Partial<Order>): Promise<Order> {
    const order = this.repo.create(data);
    return this.repo.save(order);
  }

  async updateOrder(id: string, data: Partial<Order>): Promise<Order | null> {
    await this.repo.update(id, data);
    return this.repo.findOneBy({ id });
  }

  async deleteOrder(id: string): Promise<boolean> {
    const result = await this.repo.delete(id);
    return (result.affected ?? 0) > 0;
  }
}
