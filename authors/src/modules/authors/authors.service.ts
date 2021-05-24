import { Injectable } from '@nestjs/common';

import { Author } from './authors.model';

@Injectable()
export class AuthorsService {
  private readonly authors: Map<number, Author>;

  constructor() {
    this.authors = new Map();
    this.authors.set(
      1,
      new Author(1)
        .withFirstName('Loreth Anne')
        .withLastName('White')
        .withAge(60)
        .withBiography('Loreth Anne White Bio')
        .withNumberOfBooks(2),
    );
    this.authors.set(
      2,
      new Author(2)
        .withFirstName('Lisa')
        .withLastName('Regan')
        .withAge(45)
        .withBiography('Lisa Regan Bio')
        .withNumberOfBooks(1),
    );
    this.authors.set(
      3,
      new Author(3)
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
}
