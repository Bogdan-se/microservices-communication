import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

import { AppModule } from './app.module';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: 'authors',
      protoPath: join(__dirname, 'protos/authors.proto'),
      url: process.env.AUTHORS_PATH || '127.0.0.1:8081',
    },
  });

  app.listen(() => console.log('Microservice is listening'));
}

bootstrap();
