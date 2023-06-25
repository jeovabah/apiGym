import { Test, TestingModule } from '@nestjs/testing';
import { TrainnersController } from './trainners.controller';
import { TrainnersService } from './trainners.service';

describe('TrainnersController', () => {
  let controller: TrainnersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrainnersController],
      providers: [TrainnersService],
    }).compile();

    controller = module.get<TrainnersController>(TrainnersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
