import { Injectable } from '@nestjs/common';

import { Book } from './books.type';
import { BookModel } from './books.model';

@Injectable()
export class BooksService {
  private readonly books: Map<number, Book>;

  public constructor() {
    this.books = new Map<number, Book>();
    this.books.set(
        1,
        new BookModel(1)
            .withTitle('Semiosis: A Novel')
            .withDescription('Semiosis: A Novel description')
            .withAuthorId(1),
    );
    this.books.set(
        2,
        new BookModel(2)
            .withTitle('The Loosening Skin')
            .withDescription('The Loosening Skin description')
            .withAuthorId(1),
    );
    this.books.set(
        3,
        new BookModel(3)
            .withTitle('Ninefox Gambit')
            .withDescription('Ninefox Gambit description')
            .withAuthorId(2),
    );
    this.books.set(
        4,
        new BookModel(4)
            .withTitle('Raven Stratagem')
            .withDescription('Raven Stratagem desccription')
            .withAuthorId(3),
    );
    this.books.set(
        5,
        new BookModel(5)
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

  public create(createBook: Partial<Book>): Book {
    const id = Math.max(...this.books.keys()) + 1;
    const book = new BookModel(id)
        .withTitle(createBook.title)
        .withDescription(createBook.description)
        .withAuthorId(createBook.authorId);

    this.books.set(
        id,
        book
    );

    return book;
  }
  public update(id: number, updateBook: Partial<Book>): Book{
    const book = {
      ...this.books.get(id),
      ...updateBook
    };

    this.books.set(
        id,
        book
    );

    return book;
  }

  public delete(id: number): void{
    this.books.delete(id);
  }
}
