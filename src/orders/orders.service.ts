import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';
import { OrderStatus, CreateOrderResponse, StockOrder } from './types/order.types';

@Injectable()
export class OrdersService {
  private orders: CreateOrderResponse[] = [];

  constructor(private configService: ConfigService) {}

  createOrder(createOrderDto: CreateOrderDto): CreateOrderResponse {
    this.validatePortfolio(createOrderDto);

    const decimalPlaces = this.getDecimalPlaces();
    const defaultPrice = this.getDefaultPrice();

    const orders = this.buildOrders(
      createOrderDto,
      decimalPlaces,
      defaultPrice,
    );

    const executionTime = this.getExecutionTime();

    const finalOrder: CreateOrderResponse = {
      executionTime,
      orders,
      createdAt: new Date(),
    };

    this.orders.push(finalOrder);

    return finalOrder;
  }

  getOrders(): CreateOrderResponse[] {
    return this.orders;
  }

  // ---------------- PRIVATE METHODS ----------------

  private validatePortfolio(dto: CreateOrderDto): void {
    if (!dto.portfolio.length) {
      throw new BadRequestException('Portfolio cannot be empty');
    }

    const totalWeight = dto.portfolio.reduce(
      (sum, item) => sum + item.weight,
      0,
    );

    if (Math.abs(totalWeight - 1) > 0.0001) {
      throw new BadRequestException('Portfolio weights must sum to 1');
    }

    if (dto.prices) {
      for (const key in dto.prices) {
        if (dto.prices[key] <= 0) {
          throw new BadRequestException(`Invalid price for ${key}`);
        }
      }
    }
  }

  private getDecimalPlaces(): number {
    return this.configService.get<number>('DECIMAL_PLACES') || 3;
  }

  private getDefaultPrice(): number {
    return this.configService.get<number>('DEFAULT_STOCK_PRICE') || 100;
  }

  private buildOrders(
    dto: CreateOrderDto,
    decimalPlaces: number,
    defaultPrice: number,
  ): StockOrder[] {
    return dto.portfolio.map((item) => {
      const amount = this.calculateInvestment(dto.amount, item.weight);

      const price = dto.prices?.[item.symbol] ?? defaultPrice;

      if (price <= 0) {
        throw new BadRequestException(`Invalid price for ${item.symbol}`);
      }

      const shares = this.calculateShares(amount, price, decimalPlaces);

      return {
        id: uuidv4(),
        orderStatus: OrderStatus.PENDING,
        symbol: item.symbol,
        type: dto.orderType,
        amount,
        price,
        shares,
      };
    });
  }

  private calculateInvestment(total: number, weight: number): number {
    return total * weight;
  }

  private calculateShares(
    amount: number,
    price: number,
    decimalPlaces: number,
  ): number {
    return parseFloat((amount / price).toFixed(decimalPlaces));
  }

  private getExecutionTime(): string {
    const day = new Date().getDay();

    return day >= 1 && day <= 5
      ? 'IMMEDIATE'
      : 'NEXT_MARKET_OPEN';
  }
}
