import { Module } from '@nestjs/common';
import { NewStockService } from './new-stock.service';
import { NewStockController } from './new-stock.controller';
import { SocketModule } from '../socket/socket.module';

@Module({
  imports: [SocketModule],
  providers: [NewStockService],
  controllers: [NewStockController],
})
export class NewStockModule {}
