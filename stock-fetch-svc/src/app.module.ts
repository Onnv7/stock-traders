import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StockDataModule } from './module/stock-data/stock-data.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  env,
  envVariable,
  kafkaConfig,
  serviceName,
} from './common/constant/config.constant';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/env/${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
    StockDataModule,
    ClientsModule.registerAsync([
      {
        name: serviceName.STOCK_PROCESSING_SVC,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: kafkaConfig.STOCK_PROCESSING_GROUP_ID,
              brokers: [configService.get<string>(envVariable.KAFKA_PATH)], //configService.get<string>('KAFKA_URL')
            },
            consumer: {
              groupId: kafkaConfig.STOCK_PROCESSING_GROUP_ID,
            },
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [ClientsModule],
})
export class AppModule {}
