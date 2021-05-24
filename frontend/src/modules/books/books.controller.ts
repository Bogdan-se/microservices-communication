import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './books.type';

@Controller('v1/books')
export class BooksController {
    constructor(private booksService: BooksService) {}

    @Get()
    async findAll(): Promise<Book[]> {
        return this.booksService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Book> {
        return this.booksService.findById(+id);
    }

    @Post()
    create(@Body() createBook: Partial<Book>): Promise<Book> {
        return this.booksService.create(createBook);
    }

    @Put(':id')
    update(
        @Param('id') id: string,
        @Body() updateBook: Partial<Book>,
    ): Promise<Book> {
        return this.booksService.update(+id, updateBook);
    }

    @Delete(':id')
    delete(@Param('id') id: string): Promise<void> {
        return this.booksService.delete(+id);
    }
}
