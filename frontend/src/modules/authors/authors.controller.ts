import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { Author } from './authors.type';

@Controller('api/v1/authors')
export class AuthorsController {
    constructor(private authorsService: AuthorsService) {}

    @Get()
    async findAll(): Promise<Author[]> {
        return this.authorsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Author> {
        return this.authorsService.findById(+id);
    }

    @Post()
    create(@Body() createAuthor: Partial<Author>): Promise<Author> {
        return this.authorsService.create(createAuthor);
    }

    @Put(':id')
    update(
        @Param('id') id: string,
        @Body() updateAuthor: Partial<Author>,
    ): Promise<Author> {
        return this.authorsService.update(+id, updateAuthor);
    }

    @Delete(':id')
    delete(@Param('id') id: string): Promise<void> {
        return this.authorsService.delete(+id);
    }
}
