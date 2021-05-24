import { Test, TestingModule } from '@nestjs/testing';
import { AuthorsService } from './authors.service';

describe('Authors', () => {
  let provider: AuthorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthorsService],
    }).compile();

    provider = module.get<AuthorsService>(AuthorsService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
