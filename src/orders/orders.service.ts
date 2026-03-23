import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';
import { OrderStatus } from './types/order.types';

@Injectable()
export class OrdersService {
  private orders = [];

  constructor(private configService: ConfigService) {}

  createOrder(createOrderDto: CreateOrderDto) {
    if (!createOrderDto.portfolio.length) {
        throw new BadRequestException('Portfolio cannot be empty');
    }

    const totalWeight = createOrderDto.portfolio.reduce(
        (sum, item) => sum + item.weight,
        0,
    );

    if (Math.abs(totalWeight - 1) > 0.0001) {
        throw new BadRequestException('Portfolio weights must sum to 1');
    }

    if (createOrderDto.prices) {
        for (const key in createOrderDto.prices) {
          if (createOrderDto.prices[key] <= 0) {
            throw new BadRequestException(`Invalid price for ${key}`);
          }
        }
    }

    const decimalPlaces = this.configService.get<number>('DECIMAL_PLACES') || 3;
    const defaultPrice =
    this.configService.get<number>('DEFAULT_STOCK_PRICE') || 100;

    const orders = createOrderDto.portfolio.map((item) => {
        const investmentAmount = createOrderDto.amount * item.weight;

        const stockPrice =
            createOrderDto.prices?.[item.symbol] ?? defaultPrice;

        if (stockPrice <= 0) {
            throw new BadRequestException(`Invalid price for ${item.symbol}`);
        }

        const sharesTobeBought = parseFloat(
            (investmentAmount / stockPrice).toFixed(decimalPlaces),
        );

        return {
            id: uuidv4(),
            orderStatus: OrderStatus.PENDING,
            symbol: item.symbol,
            type: createOrderDto.orderType,
            amount: investmentAmount,
            price: stockPrice,
            shares: sharesTobeBought,
        };
    });

    const executionTime = this.getExecutionTime();

    const finalOrder = {
    executionTime,
    orders,
    createdAt: new Date(),
    };

    this.orders.push(finalOrder);

    return finalOrder;
  }

  getOrders() {
    return this.orders;
  }

  private getExecutionTime(): string {
    const today = new Date().getDay();

    if (today >= 1 && today <= 5) {
      return 'IMMEDIATE';
    }

    return 'NEXT_MARKET_OPEN';
  }
}
