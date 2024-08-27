import { Controller, Logger } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  KafkaContext,
  MessagePattern,
  Payload,
  Transport,
} from '@nestjs/microservices';
import { kafkaConfig } from '../../common/constant/config.constant';
import { StockDto } from '../../common/dto/stock.dto';
import { StockConsumerService } from './stock-consumer.service';

@Controller('')
export class StockConsumerController {
  constructor(private readonly stockConsumerService: StockConsumerService) {}
  private logger = new Logger(StockConsumerController.name);

  @EventPattern(kafkaConfig.PROCESS_STOCK_TOPIC, Transport.KAFKA)
  async handleStockApi(@Payload() data: any) {
    this.logger.log('Hanlde data conssumer');
    const stockList = data as StockDto[];
    await this.stockConsumerService.handleNewStock(stockList);
  }
}
