import { Module } from '@nestjs/common';
import { PetService } from './services/pet/pet.service';
import { PetResolver } from './resolvers/pet/pet.resolver';

import { TypeOrmModule } from '@nestjs/typeorm';
import Pet from 'src/persistence/entities/pet/pet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pet])],
  providers: [PetService, PetResolver],
  controllers: [],
})
export class PetsModule {}
