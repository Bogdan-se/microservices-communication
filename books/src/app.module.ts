import { Module } from '@nestjs/common';

import { AuthorsModule } from './modules/authors/authors.module';
import { BooksModule } from './modules/books/books.module';

@Module({
  imports: [AuthorsModule, BooksModule],
})
export class AppModule {}
