import { Module } from '@nestjs/common';
import { StockDataService } from './stock-data.service';

@Module({
  providers: [StockDataService]
})
export class StockDataModule {}
