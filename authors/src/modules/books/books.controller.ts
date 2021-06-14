import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

import { BOOK_CREATED, BOOK_DELETED } from './books.const';
import { AuthorsService } from '../authors/authors.service';
import { BooksService } from './books.service';

@Controller()
export class BooksController {
  constructor(
    private readonly authorsService: AuthorsService,
    private readonly booksService: BooksService,
  ) {}

  @EventPattern(BOOK_CREATED)
  created(data: {authorId: number, bookId: number}) {
    const {authorId, bookId} = data;
    if (!this.booksService.isBookAdded(authorId, bookId)) {
      this.authorsService.increaseAuthorBooks(authorId);
      this.booksService.addBook(authorId, bookId);
    }
  }

  @EventPattern(BOOK_DELETED)
  deleted(data: {authorId: number, bookId: number}) {
    const {authorId, bookId} = data;
    if (this.booksService.isBookAdded(authorId, bookId)) {
      this.authorsService.decreaseAuthorBooks(authorId);
      this.booksService.deleteBook(authorId, bookId);
    }
  }
}
