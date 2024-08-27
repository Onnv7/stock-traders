import { ConfigService } from '@nestjs/config';

console.log('Kafka URL:', process.env.KAFKA_URL);
export const kafkaConfig = {
  KAFKA_PATH: 'localhost:9094',
  STREAM_CLIENT: 'stream-svc',
  STOCK_PROCESSING_CLIENT: 'stock-processing-svc',
  PROCESS_STOCK_TOPIC: 'process-stock',
  STOCK_PROCESSING_GROUP_ID: 'stock-processing-group',
};

export const serviceName = {
  STREAM_SVC: 'STREAM_SERVICE',
  STOCK_PROCESSING_SVC: 'STOCK_PROCESSING_SERVICE',
};

export const env = (configService: ConfigService) => ({
  KAFKA_PATH: configService.get<string>('KAFKA_URL'),
});

export const envVariable = {
  KAFKA_PATH: 'KAFKA_PATH',
};
