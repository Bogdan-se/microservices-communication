import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';

import { Book } from './books.type';
import { BooksService } from './books.service';

@Controller('v1/books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  findAll(): Book[] {
    return this.booksService.getBooks();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Book {
    return this.booksService.findById(+id);
  }

  @Post()
  create(@Body() createAuthor: Partial<Book>): Book {
    return this.booksService.create(createAuthor);
  }

  @Put(':id')
  update(
      @Param('id') id: string,
      @Body() updateBook: Partial<Book>,
  ): Book {
    return this.booksService.update(+id, updateBook);
  }

  @Delete(':id')
  delete(@Param('id') id: string): void {
    return this.booksService.delete(+id);
  }
}
