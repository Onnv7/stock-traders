import {
  Inject,
  Injectable,
  Logger,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import axios from 'axios';
import { StockDto } from '../../common/dto/stock.dto';
import {
  kafkaConfig,
  serviceName,
} from '../../common/constant/config.constant';

@Injectable()
export class StockDataService implements OnModuleInit, OnApplicationShutdown {
  private logger = new Logger(StockDataService.name);
  constructor(
    @Inject(serviceName.STOCK_PROCESSING_SVC)
    private readonly client: ClientKafka,
  ) {}

  async onApplicationShutdown(signal?: string) {
    await this.client.close();
  }
  async onModuleInit() {
    await this.client.connect();
    this.fetchAndSendData();
    setInterval(this.fetchAndSendData.bind(this), 5000); // Gọi API mỗi 5 giây
    // this.client.getConsumerAssignments()
    console.log(
      '🚀 ~ StockDataService ~ onModuleInit ~  this.client.getConsumerAssignments():',
      this.client.getConsumerAssignments(),
    );
  }

  private senData(topic: string, data: any) {
    this.client.emit(topic, data);
  }
  private async fetchAndSendData() {
    try {
      const response = await axios.post(
        'https://stocktraders.vn/service/data/getTotalTradeReal',
        {
          TotalTradeRealRequest: { account: 'StockTraders' },
        },
      );
      const stockData = response.data;
      const data = stockData.TotalTradeRealReply.stockTotalReals as StockDto[];
      this.logger.log('Emit data');
      this.client.emit(kafkaConfig.PROCESS_STOCK_TOPIC, data);
      //   this.client.emit('topic-1', 'lmao');
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
}
