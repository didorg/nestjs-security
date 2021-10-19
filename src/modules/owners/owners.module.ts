import { Module } from '@nestjs/common';

import { OwnersResolver } from './resolvers/owners.resolver';
import { OwnersService } from './services/owners.service';
import { OwnerRepository } from 'src/persistence/repositories/owner.repository';

@Module({
  imports: [],
  providers: [OwnersResolver, OwnersService, OwnerRepository],
  exports:[OwnersService],
  controllers:[],
})
export class OwnersModule {}
