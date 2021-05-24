import { Controller, Get } from '@nestjs/common';
import { Authors } from '../authors/authors';
import { Books } from '../books/books';

@Controller('v1/dashboard')
export class DashboardController {
    constructor(private authors: Authors, private books: Books) {}

    @Get()
    async index() {
        const [authors, books] = await Promise.all([
            this.authors.findAll(),
            this.books.findAll(),
        ]);

        return {
            authors,
            books
        };
    }
}
