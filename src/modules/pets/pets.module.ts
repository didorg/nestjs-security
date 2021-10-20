import { Module } from "@nestjs/common";
import { PetService } from "./services/pet/pet.service";
import { PetResolver } from "./resolvers/pet/pet.resolver";
import { PetRepository } from "src/persistence/repositories/pet.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PetServiceMapper } from "./services/pet/pet.service.mapper";

@Module({
  imports: [TypeOrmModule.forFeature([PetRepository])],
  providers: [PetResolver, PetService, PetServiceMapper],
  exports: [TypeOrmModule],
  controllers: [],
})
export class PetsModule {}
