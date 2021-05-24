import { Controller, Get, Post, Put, Delete, Param, Body  } from '@nestjs/common';

import { AuthorsService } from './authors.service';
import { Author } from './authors.type';

@Controller('v1/authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Get()
  findAll(): Author[] {
    return this.authorsService.getAuthors();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Author {
    return this.authorsService.findById(+id);
  }

  @Post()
  create(@Body() createAuthor: Partial<Author>): Author {
    return this.authorsService.create(createAuthor);
  }

  @Put(':id')
  update(
      @Param('id') id: string,
      @Body() updateAuthor: Partial<Author>,
  ): Author {
    return this.authorsService.update(+id, updateAuthor);
  }

  @Delete(':id')
  delete(@Param('id') id: string): void {
    return this.authorsService.delete(+id);
  }
}
