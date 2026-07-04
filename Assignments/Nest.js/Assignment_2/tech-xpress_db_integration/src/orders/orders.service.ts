import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './order.entity';

@Injectable()
export class OrdersService {
  constructor(private readonly orderRepository: OrderRepository) {}

  async findAll(
    clientId?: number,
    paymentMethod?: 'Cash' | 'Visa',
  ): Promise<Order[]> {
    return this.orderRepository.findAll({ clientId, paymentMethod });
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.orderRepository.findById(id);
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    return order;
  }

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    return this.orderRepository.createOrder(createOrderDto);
  }

  async update(
    id: string,
    updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    await this.findOne(id);
    const updated = await this.orderRepository.updateOrder(id, updateOrderDto);
    if (!updated) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    return updated;
  }

  async remove(id: string): Promise<void> {
    const deleted = await this.orderRepository.deleteOrder(id);
    if (!deleted) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
  }
}
