import { Controller, Get, Query } from '@nestjs/common';
import { StockService } from './stock.service';
import { ApiResponseCustom } from '../../common/decorator/response-swagger.decorator';
import { ApiQueryURL } from '../../common/decorator/query-swagger.decorator';
import { ResponseAPI } from '../../common/dto/response-api.dto';
import {
  GetStockCardListResponse,
  GetStockChartResponse,
  GetStockPageResponse,
  TradeStockResponse,
} from './payload/stock.response';
import { ApiTags } from '@nestjs/swagger';
import { getCurrentDateFormatted } from '../../common/util/date.util';
import {
  GetStockCardListQuery,
  GetStockDetailCurrentQuery,
  GetStockHistoryQuery,
  GetStockPageQuery,
} from './payload/stock.query';

@Controller('stock')
@ApiTags('STOCK')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @ApiResponseCustom({
    dataType: GetStockPageResponse,
    summary: 'Get stock page',
    status: 200,
  })
  @ApiQueryURL([
    { name: 'date', example: '2024-08-23' },
    { name: 'page', example: 1 },
    { name: 'size', example: 10 },
    { name: 'ticker', example: 'ACB' },
  ])
  @Get('')
  async getStockPage(
    @Query() query: GetStockPageQuery,
  ): Promise<ResponseAPI<GetStockPageResponse>> {
    const data = await this.stockService.getStockPage(query);

    return { message: 'Get successfully', data: data };
  }

  @ApiResponseCustom({
    dataType: GetStockPageResponse,
    summary: 'Get trade stock list',
    status: 200,
  })
  @ApiQueryURL([{ name: 'ticker', example: 'ACB' }])
  @Get('/trade')
  async getStockDetailCurrent(
    @Query() query: GetStockDetailCurrentQuery,
  ): Promise<ResponseAPI<TradeStockResponse[]>> {
    const data = await this.stockService.getStockDetailCurrent(query);
    return { data, message: 'Get successfully' };
  }

  @ApiResponseCustom({
    dataType: GetStockPageResponse,
    summary: 'Get trade stock list',
    status: 200,
  })
  @ApiQueryURL([
    { name: 'page', example: 1 },
    { name: 'size', example: 10 },
  ])
  @Get('/stock-card-list')
  async getStockCardList(
    @Query() query: GetStockCardListQuery,
  ): Promise<ResponseAPI<GetStockCardListResponse>> {
    const data = await this.stockService.getStockCardPage(query);
    return { data, message: 'Get successfully' };
  }

  @ApiResponseCustom({
    dataType: GetStockChartResponse,
    summary: 'Get stock chart by ticker',
    status: 200,
  })
  @ApiQueryURL([{ name: 'ticker', example: 'ACB' }])
  @Get('/history')
  async getStockChart(
    @Query() query: GetStockHistoryQuery,
  ): Promise<ResponseAPI<GetStockChartResponse>> {
    const data = await this.stockService.getStockChart(query);
    return { data, message: 'Get successfully' };
  }
}
