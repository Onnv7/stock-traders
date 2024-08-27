import { Module } from '@nestjs/common';
import { StockConsumerService } from './stock-consumer.service';
import { StockConsumerController } from './stock-consumer.controller';

@Module({
  providers: [StockConsumerService],
  controllers: [StockConsumerController]
})
export class StockConsumerModule {}
