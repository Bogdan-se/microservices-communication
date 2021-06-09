import { Module, HttpModule } from '@nestjs/common';

import { DashboardController } from './dashboard.controller';

import { AuthorsModule } from '../authors/authors.module';
import { BooksModule } from '../books/books.module';

@Module({
  imports: [HttpModule, AuthorsModule, BooksModule],
  controllers: [DashboardController],
})
export class DashboardModule {}
