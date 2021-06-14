import { Module, forwardRef } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthorsModule } from '../authors/authors.module';

import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { AUTHORS_CLIENT } from '../authors/authors.const';

@Module({
  imports: [
    forwardRef(() => AuthorsModule),
    ClientsModule.register([
      {
        name: AUTHORS_CLIENT,
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBIT_MQ_URL || 'amqp://localhost:5672'],
          queue: process.env.AUTHORS_QUEUE || 'authors',
          queueOptions: {
            durable: false
          },
        },
      },
    ]),
  ],
  controllers: [BooksController],
  providers: [BooksService],
  exports: [BooksService],
})
export class BooksModule {}
