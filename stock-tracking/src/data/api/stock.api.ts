import { http } from '../../config/http.config';
import {
  GetCardListResponse,
  GetStockHistoryResponse,
} from '../model/response/stock.response';

export class StockAPI {
  async getStockCardList(
    page: number,
    size: number,
  ): Promise<GetCardListResponse> {
    const responseData = (
      await http.get(`/stock/stock-card-list?page=${page}&size=${size}`)
    ).data;
    return responseData.data;
  }

  async getStockHistory(ticker: string): Promise<GetStockHistoryResponse> {
    const responseData = (await http.get(`/stock/history?ticker=${ticker}`))
      .data;
    return responseData.data;
  }
}
