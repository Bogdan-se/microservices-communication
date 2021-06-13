import { Injectable, OnModuleInit } from '@nestjs/common';
import {Client, Transport, ClientGrpc} from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { join } from 'path';

import {Book} from './books.type';
interface BooksServiceInterface {
  findAll(data: {}): Observable<{books: Book[]}>;
  findOne(data: {id: number}): Observable<Book>;
  create(createBookDTO: Partial<Book>): Observable<Book>;
  update(updateBookDTO: Partial<Book>): Observable<Book>;
  delete(data: {id: number}): Observable<void>;
}

@Injectable()
export class BooksService implements OnModuleInit {
  @Client({
    transport: Transport.GRPC,
    options: {
      package: 'books',
      protoPath: join(__dirname, '../../protos/books.proto'),
      url: process.env.BOOKS_PATH || '127.0.0.1:8082',
    },
  })

  client: ClientGrpc;

  private booksMicroservice: BooksServiceInterface;

  onModuleInit() {
    this.booksMicroservice = this.client.getService<BooksServiceInterface>('BooksController');
  }

  async findAll(): Promise<Book[]> {
    const {books} = await this.booksMicroservice.findAll({}).toPromise();
    return books;
  }


  async findById(id: number): Promise<Book> {
    return this.booksMicroservice.findOne({id}).toPromise();

  }

  async create(createBookDTO: Partial<Book>): Promise<Book> {
    return this.booksMicroservice.create(createBookDTO).toPromise();
  }

  async update(id: number, updateBookDTO: Partial<Book>): Promise<Book> {
    return this.booksMicroservice.update({id, ...updateBookDTO}).toPromise();
  }

  async delete(id: number): Promise<void> {
    return this.booksMicroservice.delete({id}).toPromise();
  }
}
