import { EntityRepository, Repository } from "typeorm";
import { Owner } from "../entities/owners/owner.entity";

@EntityRepository(Owner)
export class OwnerRepository extends Repository<Owner> {
}
