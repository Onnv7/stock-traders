import { ApiProperty } from '@nestjs/swagger';

export class StockPageResponse {
  @ApiProperty()
  ticker: string;
  @ApiProperty()
  open: number;
  @ApiProperty()
  high: number;
  @ApiProperty()
  low: number;
  @ApiProperty()
  close: number;
}

export class GetStockPageResponse {
  @ApiProperty({ type: [StockPageResponse] })
  stockData: StockPageResponse[];

  @ApiProperty()
  totalPage: number;
}

export class TradeStockResponse {
  @ApiProperty()
  time: string;
  @ApiProperty()
  vol: number;
  @ApiProperty()
  price: number;
}

export class ClosePriceDataResponse {
  @ApiProperty()
  closeData: number;
  @ApiProperty()
  dateData: string;
}
export class GetStockCardResponse {
  @ApiProperty()
  ticker: string;

  @ApiProperty({ type: [ClosePriceDataResponse] })
  closePriceData: ClosePriceDataResponse[];
}
export class GetStockCardListResponse {
  @ApiProperty()
  cardList: GetStockCardResponse[];
  @ApiProperty()
  totalPage: number;
}

export class StockCols {
  @ApiProperty()
  open: number;
  @ApiProperty()
  high: number;
  @ApiProperty()
  low: number;
  @ApiProperty()
  close: number;
  @ApiProperty()
  date: string;
}
export class GetStockChartResponse {
  @ApiProperty()
  vol: number;
  @ApiProperty()
  growthRate: number;
  @ApiProperty({ type: [StockCols] })
  data: StockCols[];
}
