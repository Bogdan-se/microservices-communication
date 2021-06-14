import { Injectable } from '@nestjs/common';

import { Book } from './books.type';
import { BookModel } from './books.model';

@Injectable()
export class BooksService {
  private readonly books: Map<number, Book>;
  private nextId = 1;

  public constructor() {
    this.books = new Map<number, Book>();
  }

  private getNextId() {
    return this.nextId++;
  }

  public getBooks(): Book[] {
    return Array.from(this.books.values());
  }

  public findById(id: number): Book {
    return this.books.get(id);
  }

  public create(createBook: Partial<Book>): Book {
    const id = this.getNextId();

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

  public deleteBooksByAuthor(authorId: number): void {
    this.getBooks().forEach(book => {
      if (book.authorId === authorId) {
        this.delete(book.id);
      }
    })
  }
}
