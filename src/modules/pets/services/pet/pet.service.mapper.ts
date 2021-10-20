import { Injectable } from "@nestjs/common";
import Pet from "src/persistence/entities/pet/pet.entity";
import { PetInputDTO } from "../../dto/pet.in.dto";
import { PetOutputDTO } from "../../dto/pet.out.dto";

@Injectable()
export class PetServiceMapper {
  async mapperPetInputDTOToPet(petInputDTO: PetInputDTO): Promise<Pet> {
    try {
      const pet = new Pet();
      pet.id = petInputDTO.id;
      pet.name = petInputDTO.name;
      pet.type = petInputDTO.type;
      pet.owner = petInputDTO.owner;
      return pet;
    } catch (e) {
      throw e;
    }
  }

  async mapperPetsToPetOutputDTOs(pets: Pet[]): Promise<PetOutputDTO[]> {
    let petsOut: PetOutputDTO[] = [];

    for (let pet of pets) {
      let petOut = await this.mapperPetToPetOutputDTO(pet);
      petsOut.push(petOut);
    }

    return petsOut;
  }

  async mapperPetToPetOutputDTO(pet: Pet): Promise<PetOutputDTO> {
    try {
      const petOut = new PetOutputDTO();
      petOut.id = pet.id;
      petOut.name = pet.name;
      petOut.type = pet.type;
      petOut.owner = pet.owner;
      return petOut;
    } catch (e) {
      throw e;
    }
  }
}
