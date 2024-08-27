import {
  StockCardEntity,
  StockCardPageEntity,
  StockChartEntity,
  StockCurrentChartEntity,
} from '../../../domain/entity/dashboard.entity';
import { StockAPI } from '../../api/stock.api';

export class StockRepository {
  constructor(private readonly stockApi: StockAPI) {}

  async getStockCardList(
    page: number,
    size: number,
  ): Promise<StockCardPageEntity> {
    const data = new StockCardPageEntity();
    const response = await this.stockApi.getStockCardList(page, size);
    data.totalPage = response.totalPage;
    data.cardList = response.cardList as StockCardEntity[];
    return data;
  }

  async getStockChart(ticker: string): Promise<{
    data: StockChartEntity[];
    stockCurrent: StockCurrentChartEntity;
  }> {
    const data = await this.stockApi.getStockHistory(ticker);
    const chartData = data.data.map((item) => {
      return {
        x: new Date(item.date),
        y: [item.open, item.high, item.low, item.close],
      };
    });
    return {
      data: chartData!,
      stockCurrent: {
        growthRate: data.growthRate,
        vol: data.vol,
      },
    };
  }
}
