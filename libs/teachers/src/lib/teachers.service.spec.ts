import { Test } from '@nestjs/testing';
import { TeachersService } from './teachers.service';

describe('TeachersService', () => {
  let service: TeachersService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [TeachersService],
    }).compile();

    service = module.get(TeachersService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
