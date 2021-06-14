import { Module, forwardRef } from '@nestjs/common';
import { AuthorsModule } from '../authors/authors.module';

import { BooksController } from './books.controller';
import { BooksService } from './books.service';

@Module({
  imports: [forwardRef(() => AuthorsModule)],
  controllers: [BooksController],
  providers: [BooksService],
  exports: [BooksService],
})
export class BooksModule {}
