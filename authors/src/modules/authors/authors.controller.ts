import { Controller, Get } from '@nestjs/common';

import { AuthorsService } from './authors.service';

@Controller()
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  //TODO implement Rest controller
}
