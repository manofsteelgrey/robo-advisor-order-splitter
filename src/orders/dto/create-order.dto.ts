// src/orders/dto/create-order.dto.ts

import {
    IsNumber,
    IsEnum,
    IsArray,
    ValidateNested,
    IsOptional,
    IsObject,
    Min,
  } from 'class-validator';
  import { Type } from 'class-transformer';
  import { PortfolioItemDto } from './portfolio-item.dto';
  import { OrderType } from '../types/order.types';

  export class CreateOrderDto {
    @IsNumber()
    @Min(1)
    amount: number;

    @IsEnum(OrderType)
    orderType: OrderType;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => PortfolioItemDto)
    portfolio: PortfolioItemDto[];

    @IsOptional()
    @IsObject()
    prices?: Record<string, number>;
  }
