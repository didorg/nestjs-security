import { Module } from '@nestjs/common';

import { OwnersResolver } from './resolvers/owners.resolver';
import { Owner } from 'src/persistence/entities/owners/owner.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OwnersService } from './services/owners.service';

@Module({
  imports: [TypeOrmModule.forFeature([Owner])],
  providers: [OwnersResolver, OwnersService]
})
export class OwnersModule {}
