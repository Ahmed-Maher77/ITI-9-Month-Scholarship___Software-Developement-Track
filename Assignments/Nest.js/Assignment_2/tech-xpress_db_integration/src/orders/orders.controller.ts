import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './order.entity';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  @ApiQuery({ name: 'clientId', required: false, type: Number })
  @ApiQuery({
    name: 'paymentMethod',
    required: false,
    enum: ['Cash', 'Visa'],
  })
  @ApiResponse({ status: 200, type: [Order] })
  findAll(
    @Query('clientId') clientId?: number,
    @Query('paymentMethod') paymentMethod?: 'Cash' | 'Visa',
  ): Promise<Order[]> {
    return this.ordersService.findAll(
      clientId ? Number(clientId) : undefined,
      paymentMethod,
    );
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: Order })
  @ApiResponse({ status: 404, description: 'Order not found' })
  findOne(@Param('id') id: string): Promise<Order> {
    return this.ordersService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: 201, type: Order })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.ordersService.create(createOrderDto);
  }

  @Put(':id')
  @ApiResponse({ status: 200, type: Order })
  @ApiResponse({ status: 404, description: 'Order not found' })
  update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    return this.ordersService.update(id, updateOrderDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: 204, description: 'No Content' })
  @ApiResponse({ status: 404, description: 'Order not found' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.ordersService.remove(id);
  }
}
