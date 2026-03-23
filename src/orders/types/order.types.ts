export enum OrderType {
    BUY = 'BUY',
    SELL = 'SELL',
  }

// PENDING → IN_PROGRESS → SUCCESS / FAILED
export enum OrderStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}

export interface StockOrder {
  id: string;
  orderStatus: OrderStatus;
  symbol: string;
  type: OrderType;
  amount: number;
  price: number;
  shares: number;
}

export interface CreateOrderResponse {
  executionTime: string;
  orders: StockOrder[];
  createdAt: Date;
}
