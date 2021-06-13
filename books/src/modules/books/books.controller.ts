import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

import { Book } from './books.type';
import { BooksService } from './books.service';

@Controller()
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @GrpcMethod()
  findAll(): {books: Book[]} {
    return {books: this.booksService.getBooks()};
  }

  @GrpcMethod()
  findOne(data: {id: string}): Book {
    return this.booksService.findById(+data.id);
  }

  @GrpcMethod()
  create(createBookDTO: Partial<Book>): Book {
    return this.booksService.create(createBookDTO);
  }

  @GrpcMethod()
  update(data: Partial<Book>): Book {
    const { id, ...updateBookDTO } = data;

    return this.booksService.update(+id, updateBookDTO);
  }

  @GrpcMethod()
  delete(data: {id: string}): void {
    const { id } = data;

    return this.booksService.delete(+id);
  }
}
