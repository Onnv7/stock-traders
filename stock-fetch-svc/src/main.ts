import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { kafkaConfig } from './common/constant/config.constant';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: [process.env.KAFKA_PATH],
        },
      },
    },
  );
  // console.log(process.env.KAFKA_URL);
  console.log(
    '🚀 ~ bootstrap ~ process.env.KAFKA_URL:',
    `${process.cwd()}/env/${process.env.NODE_ENV}.env`,
    process.env.KAFKA_URL,
  );
  await app.listen();
}
bootstrap();
