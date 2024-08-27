import { Inject, Injectable } from '@nestjs/common';
import { serviceName } from '../../common/constant/config.constant';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import {
  GetStockCardListResponse,
  GetStockChartResponse,
  GetStockPageResponse,
  TradeStockResponse,
} from './payload/stock.response';
import {
  GetStockCardListQuery,
  GetStockDetailCurrentQuery,
  GetStockHistoryQuery,
  GetStockPageQuery,
} from './payload/stock.query';

@Injectable()
export class StockService {
  constructor(
    @Inject(serviceName.STOCK_PROCESSING_SVC_TCP)
    private readonly stockProcessingTcp: ClientProxy,
  ) {}

  async getStockPage(query: GetStockPageQuery) {
    return await firstValueFrom(
      this.stockProcessingTcp.send<
        GetStockPageResponse,
        { query: GetStockPageQuery }
      >(
        {
          cmd: 'get-all-stock',
        },
        { query },
      ),
    );
  }

  async getStockDetailCurrent(query: GetStockDetailCurrentQuery) {
    return await firstValueFrom(
      this.stockProcessingTcp.send<
        TradeStockResponse[],
        { query: GetStockDetailCurrentQuery }
      >(
        {
          cmd: 'get-stock-detail-current',
        },
        { query },
      ),
    );
  }

  async getStockCardPage(query: GetStockCardListQuery) {
    return await firstValueFrom(
      this.stockProcessingTcp.send<
        GetStockCardListResponse,
        { query: GetStockCardListQuery }
      >(
        {
          cmd: 'get-stock-card-list',
        },
        { query },
      ),
    );
  }
  async getStockChart(query: GetStockHistoryQuery) {
    return await firstValueFrom(
      this.stockProcessingTcp.send<
        GetStockChartResponse,
        { query: GetStockHistoryQuery }
      >(
        {
          cmd: 'get-stock-chart',
        },
        { query },
      ),
    );
  }
}
