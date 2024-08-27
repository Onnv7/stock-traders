import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TradeStock } from '../schema/trade-stock.schema';

export class TradeStockRepository {
  constructor(
    @InjectModel(TradeStock.name)
    private readonly tradeStockModel: Model<TradeStock>,
  ) {}
  async create(tradeStock: TradeStock) {
    await this.tradeStockModel.create(tradeStock);
  }

  async getTradeStockList(ticker: string, date: string) {
    return await this.tradeStockModel.find({ ticker, date });
  }
}
