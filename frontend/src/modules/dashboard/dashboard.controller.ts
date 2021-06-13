import { Controller, Get } from '@nestjs/common';
import { AuthorsService } from '../authors/authors.service';
import { Author } from '../authors/authors.type';
import { BooksService } from '../books/books.service';
import { Book } from '../books/books.type';

@Controller('api/v1/dashboard')
export class DashboardController {
    constructor(private authorsService: AuthorsService, private booksService: BooksService) {}

    @Get()
    async index(): Promise<{authors: Author[], books: Book[]}> {
        const [authors, books] = await Promise.all([
            this.authorsService.findAll(),
            this.booksService.findAll(),
        ]);

        return {
            authors,
            books
        };
    }
}
