import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { kafkaConfig } from './common/constant/config.constant';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: kafkaConfig.STOCK_PROCESSING_GROUP_ID,
        brokers: [process.env.KAFKA_PATH],
      },
      consumer: {
        groupId: kafkaConfig.STOCK_PROCESSING_GROUP_ID,
      },
    },
  });

  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: process.env.STOCK_PROCESSING_HOST,
      port: Number(process.env.STOCK_PROCESSING_PORT),
    },
  });
  console.log(process.env.MONGO_PATH);
  // await app.listen(3001);
  await app.startAllMicroservices();
}
bootstrap();
