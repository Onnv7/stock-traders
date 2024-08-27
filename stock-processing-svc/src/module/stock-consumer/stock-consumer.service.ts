import {
  Inject,
  Injectable,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { StockRepository } from '../../repository/stock.repository';
import { StockDto } from '../../common/dto/stock.dto';
import { Stock } from '../../schema/stock.schema';
import { TradeStock } from '../../schema/trade-stock.schema';
import { TradeStockRepository } from '../../repository/trade-stock.repository';

import { ClientKafka } from '@nestjs/microservices';
import {
  kafkaConfig,
  serviceName,
} from '../../common/constant/config.constant';
import { getDateTimeCurrent } from '../../common/util/date.util';
import { time } from 'console';

@Injectable()
export class StockConsumerService
  implements OnModuleInit, OnApplicationShutdown
{
  constructor(
    private readonly stockRepository: StockRepository,
    private readonly tradeStockRepository: TradeStockRepository,
    @Inject(serviceName.STOCK_SOCKET_SVC)
    private readonly client: ClientKafka,
  ) {}

  async onApplicationShutdown(signal?: string) {
    await this.client.close();
  }

  async onModuleInit() {
    await this.client.connect();
  }

  async handleNewStock(stockList: StockDto[]) {
    for (const stock of stockList) {
      const currentStock = await this.stockRepository.getNewestTickerByName(
        stock.ticker,
        stock.date,
      );

      if (!currentStock) {
        const newStock: Stock = { ...stock };
        await this.stockRepository.createStock(newStock);
        const tradeStock: TradeStock = {
          ticker: newStock.ticker,
          date: getDateTimeCurrent('date'),
          time: getDateTimeCurrent('time'),
          price: newStock.close,
          vol: newStock.vol,
        };
        await this.tradeStockRepository.create(tradeStock);
        continue;
      }
      const isChanged =
        currentStock.high !== stock.high ||
        currentStock.low !== stock.low ||
        currentStock.vol !== stock.vol ||
        currentStock.close !== stock.close;
      // isChanged
      if (isChanged) {
        // phát sự kiện vào new_stock topic để emit socket
        this.client.emit(kafkaConfig.NEW_STOCK_TOPIC, stock);
        const volChange = stock.vol - currentStock.vol;
        // save lại giá trị stock hiện tại
        Object.assign(currentStock, stock);
        await currentStock.save();

        // tạo lịch sử sự thay đổi của stock
        const tradeStock: TradeStock = {
          ticker: currentStock.ticker,
          date: getDateTimeCurrent('date'),
          time: getDateTimeCurrent('time'),
          price: stock.close,
          vol: volChange,
        };

        this.client.emit(kafkaConfig.NEW_TRADE_TOPIC, {
          time: tradeStock.time,
          price: tradeStock.price,
          vol: tradeStock.vol,
        });

        await this.tradeStockRepository.create(tradeStock);
      }
    }
  }
}
