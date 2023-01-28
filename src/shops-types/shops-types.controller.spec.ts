import { Test, TestingModule } from '@nestjs/testing';
import { ShopsTypesController } from './shops-types.controller';
import { ShopsTypesService } from './shops-types.service';

describe('ShopsTypesController', () => {
  let controller: ShopsTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShopsTypesController],
      providers: [ShopsTypesService],
    }).compile();

    controller = module.get<ShopsTypesController>(ShopsTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
