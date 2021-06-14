import { Controller, NotFoundException, Inject } from '@nestjs/common';
import { GrpcMethod, ClientProxy } from '@nestjs/microservices';

import { Book } from './books.type';
import { BooksService } from './books.service';
import { BOOK_CREATED, BOOK_DELETED } from './books.const';
import { AuthorsService } from '../authors/authors.service';
import { AUTHORS_CLIENT } from '../authors/authors.const';

@Controller()
export class BooksController {
  constructor(
    private readonly booksService: BooksService,
    private readonly authorsService: AuthorsService,
    @Inject(AUTHORS_CLIENT) private readonly client: ClientProxy
  ) {}

  @GrpcMethod()
  findAll(): {books: Book[] & {authorFirstName: string, authorLastName: string}[]} {
    const books = this.booksService.getBooks()
    return {books: books.map(book => {
        const author = this.authorsService.findById(book.authorId);
        return {
          ...book,
          authorFirstName: author.firstName,
          authorLastName: author.lastName
        }
      })};
  }

  @GrpcMethod()
  findOne(data: {id: string}): Book {
    return this.booksService.findById(+data.id);
  }

  @GrpcMethod()
  create(createBookDTO: Partial<Book>): Book {
    this.validateAuthor(createBookDTO.authorId);
    const book = this.booksService.create(createBookDTO);

    this.client.emit(BOOK_CREATED, {authorId: book.authorId, bookId: book.id});

    return book;
  }

  @GrpcMethod()
  update(data: Partial<Book>): Book {
    const { id, ...updateBookDTO } = data;

    if (updateBookDTO.authorId) {
      this.validateAuthor(updateBookDTO.authorId);
    }

    return this.booksService.update(+id, updateBookDTO);
  }

  @GrpcMethod()
  delete(data: {id: string}): void {
    const { id } = data;
    const book = this.booksService.findById(+data.id);
    if (!book) {
      throw new NotFoundException(`Book ${id} not found`);
    }

    this.booksService.delete(+id);
    this.client.emit(BOOK_CREATED, {authorId: book.authorId, bookId: book.id});
  }

  private validateAuthor(authorId: number): void {
    const author = this.authorsService.findById(authorId);
    if (!author) {
      throw new NotFoundException(`Author ${authorId} not found`);
    }
  }
}
