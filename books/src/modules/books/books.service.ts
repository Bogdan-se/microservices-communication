import { Injectable } from '@nestjs/common';

import { Book } from './books.model';

@Injectable()
export class BooksService {
  private readonly books: Map<number, Book>;

  public constructor() {
    this.books = new Map<number, Book>();
    this.books.set(
      1,
      new Book(1)
        .withTitle('Semiosis: A Novel')
        .withDescription('Semiosis: A Novel description')
        .withAuthorId(1),
    );
    this.books.set(
      2,
      new Book(2)
        .withTitle('The Loosening Skin')
        .withDescription('The Loosening Skin description')
        .withAuthorId(1),
    );
    this.books.set(
      3,
      new Book(3)
        .withTitle('Ninefox Gambit')
        .withDescription('Ninefox Gambit description')
        .withAuthorId(2),
    );
    this.books.set(
      4,
      new Book(4)
        .withTitle('Raven Stratagem')
        .withDescription('Raven Stratagem desccription')
        .withAuthorId(3),
    );
    this.books.set(
      5,
      new Book(5)
        .withTitle('Revenant Gun')
        .withDescription('Revenant Gun description')
        .withAuthorId(3),
    );
  }

  public getBooks(): Book[] {
    return Array.from(this.books.values());
  }

  public findById(id: number): Book {
    return this.books.get(id);
  }
}
