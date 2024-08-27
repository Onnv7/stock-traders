import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { kafkaConfig } from '../../common/constant/config.constant';
import { NewStockService } from './new-stock.service';

@Controller('new-stock')
export class NewStockController {
  constructor(private readonly newStockService: NewStockService) {}
  @EventPattern(kafkaConfig.NEW_STOCK_TOPIC)
  handleNewStockTopic(@Payload() data: any) {
    this.newStockService.handleNewStockTopic(data);
  }
}
