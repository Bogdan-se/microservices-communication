import { Injectable } from '@nestjs/common';

import { Author } from './authors.type';
import { AuthorModel } from './authors.model';

@Injectable()
export class AuthorsService {
  private readonly authors: Map<number, Author>;

  constructor() {
    this.authors = new Map();
    this.authors.set(
      1,
      new AuthorModel(1)
        .withFirstName('Loreth Anne')
        .withLastName('White')
        .withAge(60)
        .withBiography('Loreth Anne White Bio')
        .withNumberOfBooks(2),
    );
    this.authors.set(
      2,
      new AuthorModel(2)
        .withFirstName('Lisa')
        .withLastName('Regan')
        .withAge(45)
        .withBiography('Lisa Regan Bio')
        .withNumberOfBooks(1),
    );
    this.authors.set(
      3,
      new AuthorModel(3)
        .withFirstName('Ty')
        .withLastName('Patterson')
        .withAge(55)
        .withBiography('Ty Patterson Bio')
        .withNumberOfBooks(2),
    );
  }

  public getAuthors(): Author[] {
    return Array.from(this.authors.values());
  }

  public findById(id: number): Author {
    return this.authors.get(id);
  }

  public create(createAuthor: Partial<Author>): Author{
    const id = Math.max(...this.authors.keys()) + 1;
    const author = new AuthorModel(id)
        .withFirstName(createAuthor.firstName)
        .withLastName(createAuthor.lastName)
        .withAge(createAuthor.age)
        .withBiography(createAuthor.biography)
        .withNumberOfBooks(createAuthor.numberOfBooks);

    this.authors.set(
        id,
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
