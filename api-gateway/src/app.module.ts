import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { StockModule } from './module/stock/stock.module';
import { kafkaConfig, serviceName } from './common/constant/config.constant';
import { KafkaConfig } from '@nestjs/microservices/external/kafka.interface';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/env/${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
    ClientsModule.register([
      {
        name: serviceName.STOCK_PROCESSING_SVC_TCP,
        transport: Transport.TCP,
        options: {
          host: process.env.STOCK_PROCESSING_HOST,
          port: Number(process.env.STOCK_PROCESSING_PORT),
        },
      },
    ]),
    StockModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [ClientsModule],
})
export class AppModule {}
