import { Test, TestingModule } from '@nestjs/testing';
import { TrainnersService } from './trainners.service';

describe('TrainnersService', () => {
  let service: TrainnersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrainnersService],
    }).compile();

    service = module.get<TrainnersService>(TrainnersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
