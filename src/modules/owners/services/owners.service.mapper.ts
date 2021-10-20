import { Injectable } from "@nestjs/common";
import { Owner } from "src/persistence/entities/owners/owner.entity";
import { OwnerInputDTO } from "../dto/owner.in.dto";
import { OwnerOutputDTO } from "../dto/owner.out.dto";

@Injectable()
export class OwnersServiceMapper {
  async mapperOwnerInputDTOToOwner(
    ownerInputDTO: OwnerInputDTO
  ): Promise<Owner> {
    try {
      const owner = new Owner();
      owner.id = ownerInputDTO.id;
      owner.name = ownerInputDTO.name;
      owner.pets = ownerInputDTO.pets;
      return owner;
    } catch (e) {
      throw e;
    }
  }

  async mapperOwnersToOwnerOutputDTOs(
    owners: Owner[]
  ): Promise<OwnerOutputDTO[]> {
    let ownersOut: OwnerOutputDTO[] = [];

    for (let owner of owners) {
      let ownerOut = await this.mapperOwnerToOwnerOutputDTO(owner);
      ownersOut.push(ownerOut);
    }

    return ownersOut;
  }

  async mapperOwnerToOwnerOutputDTO(owner: Owner): Promise<OwnerOutputDTO> {
    try {
      const ownerOut = new OwnerOutputDTO();
      ownerOut.id = owner.id;
      ownerOut.name = owner.name;
      ownerOut.pets = owner.pets;

      return ownerOut;
    } catch (e) {
      throw e;
    }
  }
}
