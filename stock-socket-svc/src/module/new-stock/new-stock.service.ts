import { Injectable } from '@nestjs/common';
import { SocketGateWay } from '../socket/socket.gateway';

@Injectable()
export class NewStockService {
  constructor(private readonly socket: SocketGateWay) {}
  handleNewStockTopic(data: any) {
    this.socket.emitNewStock(data);
  }
}
