import { Injectable } from "@nestjs/common";
import Pet from "src/persistence/entities/pet/pet.entity";
import { PetRepository } from "src/persistence/repositories/pet.repository";
import { PetInputDTO } from "../../dto/pet.in.dto";
import { PetOutputDTO } from "../../dto/pet.out.dto";
import { PetServiceMapper } from "./pet.service.mapper";

@Injectable()
export class PetService {
  constructor(
    private readonly petRepository: PetRepository,
    private petServiceMapper: PetServiceMapper
  ) {}

  async createPet(petIn: PetInputDTO): Promise<PetOutputDTO> {
    const pet: Pet = await this.petServiceMapper.mapperPetInputDTOToPet(petIn);
    const petCreated: Pet = this.petRepository.create(pet);
    const petSaved: Pet = await this.petRepository.save(petCreated);
    const petOut: PetOutputDTO =
      await this.petServiceMapper.mapperPetToPetOutputDTO(petSaved);
    return petOut;
  }

  async findAll(): Promise<PetOutputDTO[]> {
    const pets = await this.petRepository.find();
    const petOutputDTOs = await this.petServiceMapper.mapperPetsToPetOutputDTOs(
      pets
    );
    return petOutputDTOs;
  }

  async findOne(id: number): Promise<PetOutputDTO> {
    const petById: Pet = await this.petRepository.findOneOrFail(id);
    const petOutputDTO = await this.petServiceMapper.mapperPetToPetOutputDTO(
      petById
    );
    return petOutputDTO;
  }
}
