import {HttpModule, Module} from '@nestjs/common';
import {AuthorsService} from './authors.service';
import {AuthorsController} from './authors.controller';

@Module({
    imports: [HttpModule],
    providers: [AuthorsService],
    controllers: [AuthorsController],
    exports: [AuthorsService]
})
export class AuthorsModule {}
