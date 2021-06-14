import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

import { Author } from './authors.type';
import { AuthorsService } from './authors.service';
import { AUTHOR_CREATED, AUTHOR_UPDATED, AUTHOR_DELETED } from './authors.const';
import { BooksService } from '../books/books.service';

@Controller()
export class AuthorsController {
  constructor(
    private readonly authorsService: AuthorsService,
    private readonly booksService: BooksService,
  ) {}

  @EventPattern(AUTHOR_CREATED)
  created(createAuthorDTO: Author) {
    this.authorsService.create(createAuthorDTO);
  }

  @EventPattern(AUTHOR_UPDATED)
  updated(updateAuthorDTO: Author) {
    this.authorsService.create(updateAuthorDTO);
  }

  @EventPattern(AUTHOR_DELETED)
  deleted(id: number) {
    this.booksService.deleteBooksByAuthor(id);
    this.authorsService.delete(id);
  }

}
