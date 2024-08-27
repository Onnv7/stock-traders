import { Injectable } from '@nestjs/common';
import { StockRepository } from '../../repository/stock.repository';
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
import { TradeStockRepository } from '../../repository/trade-stock.repository';
import { getDateTimeCurrent } from '../../common/util/date.util';

@Injectable()
export class StockQueryService {
  constructor(
    private readonly stockRepository: StockRepository,
    private readonly tradeStockRepository: TradeStockRepository,
  ) {}
  async getStockPage(
    payload: GetStockPageQuery,
  ): Promise<GetStockPageResponse> {
    const stockPage = await this.stockRepository.getStockPage(
      payload.date,
      payload.page,
      payload.size,
      payload.ticker,
    );

    return GetStockPageResponse.fromStockDataList(
      stockPage.data,
      stockPage.totalPage,
    );
  }

  async getStockDetailCurrent(
    query: GetStockDetailCurrentQuery,
  ): Promise<TradeStockResponse[]> {
    const tradeStockList = await this.tradeStockRepository.getTradeStockList(
      query.ticker,
      getDateTimeCurrent('date'),
    );
    return TradeStockResponse.fromTradeStockDataList(tradeStockList);
  }

  async getStockCardPage(
    query: GetStockCardListQuery,
  ): Promise<GetStockCardListResponse> {
    const skip = (query.page - 1) * query.size;
    const limit = query.size;
    const tradeStockList = (await this.stockRepository.getStockCardPage(
      skip,
      limit,
    )) as GetStockCardListResponse;
    return tradeStockList;
  }
  async getStockChart(
    query: GetStockHistoryQuery,
  ): Promise<GetStockChartResponse> {
    const tradeStockList = await this.stockRepository.getStockHistoryByTicker(
      query.ticker,
    );
    return GetStockChartResponse.fromStockList(tradeStockList);
  }
}
