export const kafkaConfig = {
  STREAM_CLIENT: 'stream-svc',
  PROCESS_STOCK_TOPIC: 'process-stock',
  NEW_STOCK_TOPIC: 'new-stock',
  NEW_TRADE_TOPIC: 'new-trade-stock',
  STOCK_PROCESSING_GROUP_ID: 'stock-processing-group',
  SOCKET_GROUP_ID: 'socket-group',
};

export const serviceName = {
  STOCK_SOCKET_SVC: 'STOCK_STREAM_SERVICE',
  STOCK_PROCESSING_SVC: 'STOCK_PROCESSING_SERVICE',
};
export const envVariable = {
  KAFKA_PATH: 'KAFKA_PATH',
  MONGO_PATH: 'MONGO_PATH',
};
