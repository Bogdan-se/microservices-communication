import { Injectable, OnModuleInit } from '@nestjs/common';
import {Client, Transport, ClientGrpc} from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { join } from 'path';

import {Author} from './authors.type';
interface AuthorsServiceInterface {
  findAll(data: {}): Observable<{authors: Author[]}>;
  findOne(data: {id: number}): Observable<Author>;
  create(createAuthorDTO: Partial<Author>): Observable<Author>;
  update(updateAuthorDTO: Partial<Author>): Observable<Author>;
  delete(data: {id: number}): Observable<void>;
}

@Injectable()
export class AuthorsService implements OnModuleInit {
  @Client({
    transport: Transport.GRPC,
    options: {
      package: 'authors',
      protoPath: join(__dirname, '../../protos/authors.proto'),
      url: process.env.AUTHORS_PATH || '127.0.0.1:8081',
    },
  })

  client: ClientGrpc;

  private authorsMicroservice: AuthorsServiceInterface;

  onModuleInit() {
    this.authorsMicroservice = this.client.getService<AuthorsServiceInterface>('AuthorsController');
  }

  async findAll(): Promise<Author[]> {
    const {authors} = await this.authorsMicroservice.findAll({}).toPromise();
    return authors;
  }


  async findById(id: number): Promise<Author> {
    console.log(this.authorsMicroservice);
    return this.authorsMicroservice.findOne({id}).toPromise();

  }

  async create(createAuthorDTO: Partial<Author>): Promise<Author> {
    console.log(createAuthorDTO);
    return this.authorsMicroservice.create(createAuthorDTO).toPromise();
  }

  async update(id: number, updateAuthorDTO: Partial<Author>): Promise<Author> {
    return this.authorsMicroservice.update({id, ...updateAuthorDTO}).toPromise();
  }

  async delete(id: number): Promise<void> {
    return this.authorsMicroservice.delete({id}).toPromise();
  }
}
