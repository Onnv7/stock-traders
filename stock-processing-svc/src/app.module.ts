import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StockQueryModule } from './module/stock-query/stock-query.module';
import { StockConsumerModule } from './module/stock-consumer/stock-consumer.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Stock, StockSchema } from './schema/stock.schema';
import { StockRepository } from './repository/stock.repository';
import { TradeStock, TradeStockSchema } from './schema/trade-stock.schema';
import { TradeStockRepository } from './repository/trade-stock.repository';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  envVariable,
  kafkaConfig,
  serviceName,
} from './common/constant/config.constant';
import { ConfigModule, ConfigService } from '@nestjs/config';

const repositoryList = [StockRepository, TradeStockRepository];
@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/env/${process.env.NODE_ENV ? process.env.NODE_ENV : 'dev'}.env`,
      isGlobal: true,
    }),
    ClientsModule.registerAsync([
      {
        name: serviceName.STOCK_SOCKET_SVC,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: kafkaConfig.SOCKET_GROUP_ID,
              brokers: [configService.get<string>(envVariable.KAFKA_PATH)],
            },
            consumer: {
              groupId: kafkaConfig.SOCKET_GROUP_ID,
            },
          },
        }),
        inject: [ConfigService],
      },
    ]),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>(envVariable.MONGO_PATH),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),

    MongooseModule.forFeature([
      { name: Stock.name, schema: StockSchema },
      { name: TradeStock.name, schema: TradeStockSchema },
    ]),
    StockQueryModule,
    StockConsumerModule,
  ],
  controllers: [AppController],
  providers: [AppService, ...repositoryList],
  exports: [ClientsModule, ...repositoryList],
})
export class AppModule {}
