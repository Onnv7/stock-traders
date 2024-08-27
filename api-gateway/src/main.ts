import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { TransformInterceptor } from './common/interceptor/transform.interceptor';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api');
  app.enableCors({
    origin: (origin, callback) => {
      if (origin) {
        callback(null, true);
      } else {
        callback(null, true);
      }
    },
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  // set interceptor
  app.useGlobalInterceptors(new TransformInterceptor());
  const config = new DocumentBuilder()
    .setTitle('StockTraders API')
    .setDescription('')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'Enter JWT token',
        in: 'header',
      },
      'access-token',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  const port: number = Number(process.env.PORT) || 3000;

  console.log(
    '🚀 ~ bootstrap ~ process.env.STOCK_PROCESSING_HOST:',
    process.env.STOCK_PROCESSING_HOST,
  );
  await app
    .listen(port)
    .then(() => console.log('Server is running on port ' + port));
}
bootstrap();
