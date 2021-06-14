import { Injectable } from '@nestjs/common';

import { Author } from './authors.type';
import { AuthorModel } from './authors.model';

@Injectable()
export class AuthorsService {
  private readonly authors: Map<number, Author>;

  constructor() {
    this.authors = new Map();
  }

  public getAuthors(): Author[] {
    return Array.from(this.authors.values());
  }

  public findById(id: number): Author {
    return this.authors.get(id);
  }

  public create(createAuthor: Partial<Author>): Author{
    const author = new AuthorModel(createAuthor.id)
      .withFirstName(createAuthor.firstName)
      .withLastName(createAuthor.lastName)

    this.authors.set(
      createAuthor.id,
      author
    );

    return author;
  }
  public update(id: number, updateAuthor: Partial<Author>): Author{
    const author = {
      ...this.authors.get(id),
      ...updateAuthor
    };

    this.authors.set(
      id,
      author
    );

    return author;
  }

  public delete(id: number): void{
    this.authors.delete(id);
  }
}
