import { Test } from '@nestjs/testing';
import { TeachersController } from './teachers.controller';
import { TeachersService } from './teachers.service';

describe('TeachersController', () => {
  let controller: TeachersController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [TeachersService],
      controllers: [TeachersController],
    }).compile();

    controller = module.get(TeachersController);
  });

  it('should be defined', () => {
    expect(controller).toBeTruthy();
  });
});
