import { Module } from '@nestjs/common';
import { OwnersResolver } from './resolvers/owners.resolver';
import { OwnersService } from './services/owners.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OwnerRepository } from 'src/persistence/repositories/owner.repository';

@Module({
  imports: [TypeOrmModule.forFeature([OwnerRepository])],
  providers: [OwnersResolver, OwnersService],
  exports:[TypeOrmModule],
  controllers:[],
})
export class OwnersModule {}
