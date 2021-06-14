import { Injectable } from '@nestjs/common';

@Injectable()
export class BooksService {
  private readonly books: Map<number, Set<number>>;

  public constructor() {
    this.books = new Map<number, Set<number>>();
  }

  isBookAdded(authorId: number, bookId: number): boolean {
    const authorBooks = this.getAuthorBooks(authorId);
    return authorBooks.has(bookId);
  }

  addBook(authorId: number, bookId: number): void {
    const authorBooks = this.getAuthorBooks(authorId);
    if (!authorBooks.has(bookId)) {
      authorBooks.add(bookId);
    }

    this.books.set(authorId, authorBooks);
  }

  deleteBook(authorId: number, bookId: number): void {
    const authorBooks = this.getAuthorBooks(authorId);
    if (authorBooks.has(bookId)) {
      authorBooks.delete(bookId);
    }

    this.books.set(authorId, authorBooks);
  }

  getAuthorBooks(authorId: number): Set<number> {
    if (this.books.has(authorId)) {
      return this.books.get(authorId);
    }

    return new Set<number>();
  }
}
