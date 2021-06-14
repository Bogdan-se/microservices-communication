import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod, ClientProxy } from '@nestjs/microservices';

import { AuthorsService } from './authors.service';
import { Author } from './authors.type';
import { AUTHOR_CREATED, AUTHOR_UPDATED, AUTHOR_DELETED } from './authors.const';
import { BOOKS_CLIENT } from '../books/books.const';

@Controller()
export class AuthorsController {
  constructor(
    private readonly authorsService: AuthorsService,
    @Inject(BOOKS_CLIENT) private readonly client: ClientProxy
  ) {}

  @GrpcMethod()
  findAll(): {authors: Author[]} {
    return {authors: this.authorsService.getAuthors()};
  }

  @GrpcMethod()
  findOne(data: {id: number}): Author {
    return this.authorsService.findById(data.id);
  }

  @GrpcMethod()
  create(createAuthorDTO: Partial<Author>): Author {
    const createdAuthor = this.authorsService.create(createAuthorDTO);

    this.client.emit(AUTHOR_CREATED, createdAuthor);

    return createdAuthor;
  }

  @GrpcMethod()
  update(data: Partial<Author>): Author {
    const { id, ...updateAuthorDTO } = data;
    const updatedAuthor = this.authorsService.update(id, updateAuthorDTO);

    this.client.emit(AUTHOR_UPDATED, updatedAuthor);

    return updatedAuthor;
  }

  @GrpcMethod()
  delete(data: {id: number}): void {
    const { id } = data;
    this.authorsService.delete(id);

    this.client.emit(AUTHOR_DELETED, id);
  }
}
