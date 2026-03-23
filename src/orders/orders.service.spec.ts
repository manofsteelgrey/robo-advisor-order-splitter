import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { ConfigService } from '@nestjs/config';
import { OrderType } from './types/order.types';

describe('OrdersService', () => {
  let service: OrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: ConfigService,
          useValue: {
            get: (key: string) => {
              if (key === 'DECIMAL_PLACES') return 3;
              if (key === 'DEFAULT_STOCK_PRICE') return 100;
            },
          },
        },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
  });

  it('should create orders correctly', () => {
    const result = service.createOrder({
      amount: 100,
      orderType: OrderType.BUY,
      portfolio: [
        { symbol: 'AAPL', weight: 0.6 },
        { symbol: 'TSLA', weight: 0.4 },
      ],
    });

    expect(result.orders.length).toBe(2);
    expect(result.orders[0].shares).toBe(0.6);
  });

  it('should throw error if weights do not sum to 1', () => {
    expect(() =>
      service.createOrder({
        amount: 100,
        orderType: OrderType.BUY,
        portfolio: [{ symbol: 'AAPL', weight: 0.5 }],
      }),
    ).toThrow();
  });

  it('should use provided prices', () => {
    const result = service.createOrder({
      amount: 100,
      orderType: OrderType.BUY,
      portfolio: [{ symbol: 'AAPL', weight: 1 }],
      prices: { AAPL: 200 },
    });

    expect(result.orders[0].price).toBe(200);
    expect(result.orders[0].shares).toBe(0.5);
  });

  it('should throw error for invalid price', () => {
    expect(() =>
      service.createOrder({
        amount: 100,
        orderType: OrderType.BUY,
        portfolio: [{ symbol: 'AAPL', weight: 1 }],
        prices: { AAPL: 0 },
      }),
    ).toThrow();
  });

  it('should create SELL order correctly', () => {
    const result = service.createOrder({
      amount: 100,
      orderType: OrderType.SELL,
      portfolio: [{ symbol: 'BMW', weight: 1 }],
    });

    expect(result.orders.length).toBe(1);
    expect(result.orders[0].type).toBe(OrderType.SELL);
    expect(result.orders[0].shares).toBe(1);
  });

  it('should fallback to default price when price not provided', () => {
    const result = service.createOrder({
      amount: 100,
      orderType: OrderType.BUY,
      portfolio: [
        { symbol: 'AAPL', weight: 0.5 },
        { symbol: 'TSLA', weight: 0.5 },
      ],
      prices: { AAPL: 200 },
    });

    expect(result.orders[0].price).toBe(200); // AAPL
    expect(result.orders[1].price).toBe(100); // TSLA default
  });

  it('should fallback to default price when price not provided', () => {
    const result = service.createOrder({
      amount: 100,
      orderType: OrderType.BUY,
      portfolio: [
        { symbol: 'AAPL', weight: 0.5 },
        { symbol: 'TSLA', weight: 0.5 },
      ],
      prices: { AAPL: 200 },
    });

    expect(result.orders[0].price).toBe(200); // AAPL
    expect(result.orders[1].price).toBe(100); // TSLA default
  });

  it('should respect decimal precision for shares', () => {
    const result = service.createOrder({
      amount: 100,
      orderType: OrderType.BUY,
      portfolio: [{ symbol: 'AAPL', weight: 1 }],
      prices: { AAPL: 3 },
    });

    expect(result.orders[0].shares).toBeCloseTo(33.333, 3);
  });

  it('should return IMMEDIATE on weekday', () => {
    jest.spyOn(global, 'Date').mockImplementation(() => ({
      getDay: () => 2, // Tuesday
    }) as any);

    const result = service.createOrder({
      amount: 100,
      orderType: OrderType.BUY,
      portfolio: [{ symbol: 'AAPL', weight: 1 }],
    });

    expect(result.executionTime).toBe('IMMEDIATE');
  });
});
