import { Test, TestingModule } from '@nestjs/testing';
import { ShopsTypesService } from './shops-types.service';

describe('ShopsTypesService', () => {
  let service: ShopsTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShopsTypesService],
    }).compile();

    service = module.get<ShopsTypesService>(ShopsTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
