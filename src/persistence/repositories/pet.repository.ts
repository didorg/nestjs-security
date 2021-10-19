import { EntityRepository, Repository } from "typeorm";
import Pet from "../entities/pet/pet.entity";

@EntityRepository(Pet)
export class PetRepository extends Repository<Pet> {}
