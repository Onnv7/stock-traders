import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { kafkaConfig } from './common/constant/config.constant';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: kafkaConfig.SOCKET_GROUP_ID,
        brokers: [process.env.KAFKA_PATH],
      },
      consumer: {
        groupId: kafkaConfig.SOCKET_GROUP_ID,
      },
    },
  });
  console.log(
    '🚀 ~ bootstrap ~ process.env.KAFKA_URL:',
    `${process.cwd()}/env/${process.env.NODE_ENV}.env`,
    process.env.KAFKA_PATH,
  );
  await app.listen(process.env.SOCKET_PORT);
  await app.startAllMicroservices();
}
bootstrap();
