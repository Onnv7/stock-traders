import { OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*', // Cho phép mọi nguồn gốc
  },
})
export class SocketGateWay implements OnModuleInit {
  private idList = [];
  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id, 'connected');
      this.idList.push(socket.id);
    });
  }
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('listen_stock')
  onNewMsg(@MessageBody() msg: string) {
    console.log('msg', msg);
    this.server.emit('new_stock', {
      data: msg,
    });
  }

  emitNewStock(data: any) {
    const result = this.server.emit('new_stock', data);

    console.log('🚀 ~ MyGateWay ~ emitStockData ~ result:', result);
  }
}
