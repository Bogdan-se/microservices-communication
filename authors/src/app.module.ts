import { Module } from '@nestjs/common';

import { AuthorsModule } from './modules/authors/authors.module';

@Module({
  imports: [AuthorsModule],
})
export class AppModule {}
