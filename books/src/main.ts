import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

import { AppModule } from './app.module';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'books',
      protoPath: join(__dirname, 'protos/books.proto'),
      url: process.env.BOOKS_PATH || '127.0.0.1:8082',
    },
  });

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBIT_MQ_URL || 'amqp://localhost:5672'],
      queue: process.env.BOOKS_QUEUE || 'books',
      queueOptions: {
        durable: false
      },
    },
  });

  await app.startAllMicroservicesAsync();
}

bootstrap();
