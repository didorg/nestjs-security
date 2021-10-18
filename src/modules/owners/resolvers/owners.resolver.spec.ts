import { Test, TestingModule } from '@nestjs/testing';
import { OwnersService } from '../services/owners.service';
import { OwnersResolver } from './owners.resolver';


describe('OwnersResolver', () => {
  let resolver: OwnersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OwnersResolver, OwnersService],
    }).compile();

    resolver = module.get<OwnersResolver>(OwnersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
