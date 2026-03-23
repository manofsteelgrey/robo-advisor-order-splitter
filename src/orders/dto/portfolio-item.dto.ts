import { IsString, IsNumber, Min, Max } from 'class-validator';

export class PortfolioItemDto {
  @IsString()
  symbol: string;

  @IsNumber()
  @Min(0)
  @Max(1)
  weight: number;
}
