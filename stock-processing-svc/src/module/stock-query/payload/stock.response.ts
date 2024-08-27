import { Stock } from '../../../schema/stock.schema';
import { TradeStock } from '../../../schema/trade-stock.schema';

export class StockPageResponse {}

export class GetStockPageResponse {
  stockData: {
    ticker: string;
    open: number;
    high: number;
    low: number;
    close: number;
  }[];

  totalPage: number;
  static fromStockDataList(stockList: Stock[], totalPage: number) {
    const data = stockList.map((stock) => ({
      ticker: stock.ticker,
      open: stock.open,
      high: stock.high,
      low: stock.low,
      close: stock.close,
    }));

    return { stockData: data, totalPage: totalPage } as GetStockPageResponse;
  }
}

export class TradeStockResponse {
  time: string;
  vol: number;
  price: number;

  static fromTradeStockDataList(tradeList: TradeStock[]) {
    return tradeList.map((item) => {
      return {
        time: item.time,
        vol: item.vol,
        price: item.price,
      };
    });
  }
}

export class GetStockCardListResponse {
  cardList: {
    ticker: string;
    vol: number;
    closePriceData: {
      closeData: number;
      dateData: string;
    }[];
  }[];
  totalPage: number;
}

export class StockCols {
  open: number;
  high: number;
  low: number;
  close: number;
  date: string;
}
export class GetStockChartResponse {
  vol: number;
  growthRate: number;
  data: StockCols[];

  static fromStockList(stockList: Stock[]): GetStockChartResponse {
    return {
      vol: stockList[0].vol,
      growthRate: stockList[1].close
        ? ((stockList[0].close - stockList[1].close) / stockList[1].close) * 100
        : 0,
      data: stockList.map((item) => {
        return {
          open: item.open,
          high: item.high,
          low: item.low,
          close: item.close,
          date: item.date,
        };
      }),
    };
  }
}
