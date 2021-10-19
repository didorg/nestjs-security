import { Module } from "@nestjs/common";
import { PetService } from "./services/pet/pet.service";
import { PetResolver } from "./resolvers/pet/pet.resolver";
import { PetRepository } from "src/persistence/repositories/pet.repository";

@Module({
  imports: [],
  providers: [PetResolver, PetService, PetRepository],
  exports: [PetService],
  controllers: [],
})
export class PetsModule {}
