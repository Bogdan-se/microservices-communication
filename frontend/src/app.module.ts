import { Module } from '@nestjs/common';

import { DashboardModule } from './modules/dashboard/dashboard.module';
import { AuthorsModule } from './modules/authors/authors.module';
import { BooksModule } from './modules/books/books.module';

@Module({
  imports: [DashboardModule, AuthorsModule, BooksModule],
})
export class AppModule {}
