import { Module } from '@nestjs/common';
import { StockQueryService } from './stock-query.service';
import { StockQueryController } from './stock-query.controller';

@Module({
  providers: [StockQueryService],
  controllers: [StockQueryController]
})
export class StockQueryModule {}
