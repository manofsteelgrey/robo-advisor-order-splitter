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
