import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import { DatabaseModule } from 'src/database/database.module';
import { CategoriesModule } from './categories.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

describe('CategoriesController', () => {
  let controller: CategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), DatabaseModule, CategoriesModule],
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
    console.log(module.get(ConfigService).get('DB_HOST'));
  });

  it('should be defined', () => {
    console.log(controller);
    expect(controller).toBeDefined();
  });
});
