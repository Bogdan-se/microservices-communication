import { Injectable, HttpService } from '@nestjs/common';

import {Author} from './authors.type';

@Injectable()
export class AuthorsService {
    constructor(private httpService: HttpService) {}

    get url(){
        return process.env.AUTHORS_ENDPOINT || 'http://127.0.0.1:8091';
    }

    async findAll(): Promise<Author[]> {
        const {data} = await this.httpService.get(`${this.url}/api/v1/authors`).toPromise();

        return data;
    }

    async findById(id: number): Promise<Author> {
        const {data} = await this.httpService.get(`${this.url}/api/v1/authors/${id}`).toPromise();

        return data;
    }

    async create(createAuthor: Partial<Author>): Promise<Author> {
        const {data} = await this.httpService.post(`${this.url}/api/v1/authors`, createAuthor).toPromise();

        return data;
    }

    async update(id: number, updateAuthor: Partial<Author>): Promise<Author> {
        const {data} = await this.httpService.put(`${this.url}/api/v1/authors/${id}`, updateAuthor).toPromise();

        return data;
    }

    async delete(id: number): Promise<void> {
        await this.httpService.delete(`${this.url}/api/v1/authors/${id}`).toPromise();
    }
}
