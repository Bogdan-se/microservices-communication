import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { BOOKS_CLIENT } from '../books/books.const';

import { AuthorsController } from './authors.controller';
import { AuthorsService } from './authors.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: BOOKS_CLIENT,
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBIT_MQ_URL || 'amqp://localhost:5672'],
          queue: process.env.BOOKS_QUEUE || 'books',
          queueOptions: {
            durable: false
          },
        },
      },
    ]),
  ],
  controllers: [AuthorsController],
  providers: [AuthorsService],
  exports: [AuthorsService]
})
export class AuthorsModule {}
