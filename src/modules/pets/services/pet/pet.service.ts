import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import Pet from 'src/persistence/entities/pet/pet.entity';
import { Repository } from 'typeorm';
import { PetInputDTO } from '../../dto/pet.in.dto';
import { PetOutputDTO } from '../../dto/pet.out.dto';

@Injectable()
export class PetService {
  constructor(
    @InjectRepository(Pet)
    private petsRepository: Repository<Pet>,
  ) {}

  async createPet(petIn: PetInputDTO): Promise<PetOutputDTO> {
    const pet: Pet = await this.mapperPetInputDTOToPet(petIn);
    const petCreated: Pet = this.petsRepository.create(pet);
    const petSaved: Pet = await this.petsRepository.save(petCreated);
    const petOut: PetOutputDTO = await this.mapperPetToPetOutputDTO(petSaved);
    return petOut;
  }

  async findAll(): Promise<PetOutputDTO[]> {
    const pets = await this.petsRepository.find();
    const petOutputDTOs = await this.mapperPetsToPetOutputDTOs(pets);
    return petOutputDTOs;
  }

  async findOne(id: number): Promise<PetOutputDTO> {
    const petById: Pet = await this.petsRepository.findOneOrFail(id);
    const petOutputDTO = await this.mapperPetToPetOutputDTO(petById);
    return petOutputDTO;
  }

  //Mappers
  // TODO: (To achieve single responsibility) Move these Mappers to a Class PetServiceMapper and Inject it here.
  private async mapperPetInputDTOToPet(petInputDTO: PetInputDTO): Promise<Pet> {
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

  private async mapperPetsToPetOutputDTOs(
    pets: Pet[],
  ): Promise<PetOutputDTO[]> {
    let petsOut: PetOutputDTO[] = [];

    for (let pet of pets) {
      let petOut = await this.mapperPetToPetOutputDTO(pet);
      petsOut.push(petOut);
    }

    return petsOut;
  }

  private async mapperPetToPetOutputDTO(pet: Pet): Promise<PetOutputDTO> {
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
