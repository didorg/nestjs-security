import { Module } from '@nestjs/common';
import { OwnersResolver } from './resolvers/owners.resolver';
import { OwnersService } from './services/owners.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OwnerRepository } from 'src/persistence/repositories/owner.repository';
import { OwnersServiceMapper } from './services/owners.service.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([OwnerRepository])],
  providers: [OwnersResolver, OwnersService, OwnersServiceMapper],
  exports:[TypeOrmModule],
  controllers:[],
})
export class OwnersModule {}
