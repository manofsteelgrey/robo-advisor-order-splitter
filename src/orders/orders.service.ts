import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class OrdersService {
  private orders = [];

  constructor(private configService: ConfigService) {}

  createOrder(createOrderDto: CreateOrderDto) {
    return {};
  }

  getOrders() {
    return this.orders;
  }
}
