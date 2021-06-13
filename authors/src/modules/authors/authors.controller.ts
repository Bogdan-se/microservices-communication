import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

import { AuthorsService } from './authors.service';
import { Author } from './authors.type';

@Controller()
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

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
    return this.authorsService.create(createAuthorDTO);
  }

  @GrpcMethod()
  update(data: Partial<Author>): Author {
    const { id, ...updateAuthorDTO } = data;

    return this.authorsService.update(id, updateAuthorDTO);
  }

  @GrpcMethod()
  delete(data: {id: number}): void {
    const { id } = data;

    return this.authorsService.delete(id);
  }
}
