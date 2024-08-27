import { Controller } from '@nestjs/common';
import { MessagePattern, Payload, Transport } from '@nestjs/microservices';
import { StockQueryService } from './stock-query.service';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import {
  GetStockCardListQuery,
  GetStockDetailCurrentQuery,
  GetStockHistoryQuery,
  GetStockPageQuery,
} from './payload/stock.query';

@Controller('stock-query')
export class StockQueryController {
  constructor(private readonly stockQueryService: StockQueryService) {}
  @MessagePattern({ cmd: 'get-all-stock' }, Transport.TCP)
  async getStockPage(@Payload() payload: { query: GetStockPageQuery }) {
    const data = await this.stockQueryService.getStockPage(payload.query);
    return data;
  }

  @MessagePattern({ cmd: 'get-stock-detail-current' }, Transport.TCP)
  async getStockDetailCurrent(
    @Payload() payload: { query: GetStockDetailCurrentQuery },
  ) {
    const data = await this.stockQueryService.getStockDetailCurrent(
      payload.query,
    );
    return data;
  }

  @MessagePattern({ cmd: 'get-stock-card-list' }, Transport.TCP)
  async getStockCardPage(@Payload() payload: { query: GetStockCardListQuery }) {
    const data = await this.stockQueryService.getStockCardPage(payload.query);
    return data;
  }

  @MessagePattern({ cmd: 'get-stock-chart' }, Transport.TCP)
  async getStockChart(@Payload() payload: { query: GetStockHistoryQuery }) {
    const data = await this.stockQueryService.getStockChart(payload.query);
    return data;
  }
}
