import {HttpService, Injectable} from '@nestjs/common';
import {Book} from "./books.type";

@Injectable()
export class BooksService {
    constructor(private httpService: HttpService) {}

    get url(){
        return process.env.BOOKS_ENDPOINT || 'http://127.0.0.1:8092';
    }

    async findAll(): Promise<Book[]> {
        const {data} = await this.httpService.get(`${this.url}/api/v1/books`).toPromise();

        return data;
    }

    async findById(id: number): Promise<Book> {
        const {data} = await this.httpService.get(`${this.url}/api/v1/books/${id}`).toPromise();

        return data;
    }

    async create(createBook: Partial<Book>): Promise<Book> {
        const {data} = await this.httpService.post(`${this.url}/api/v1/books`, createBook).toPromise();

        return data;
    }

    async update(id: number, updateBook: Partial<Book>): Promise<Book> {
        const {data} = await this.httpService.put(`${this.url}/api/v1/books/${id}`, updateBook).toPromise();

        return data;
    }

    async delete(id: number): Promise<void> {
        await this.httpService.delete(`${this.url}/api/v1/books/${id}`).toPromise();
    }
}
