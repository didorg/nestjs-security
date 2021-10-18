import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PetInputDTO } from '../../dto/pet.in.dto';
import { PetOutputDTO } from '../../dto/pet.out.dto';
import { PetService } from '../../services/pet/pet.service';

@Resolver(() => PetOutputDTO)
export class PetResolver {
  constructor(private petService: PetService) {}

  @Query(() => [PetOutputDTO])
  async pets(): Promise<PetOutputDTO[]> {
    const pets = await this.petService.findAll();
    return pets;
  }

  @Query(() => PetOutputDTO)
  async pet(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<PetOutputDTO> {
    const pet = await this.petService.findOne(id);
    return pet;
  }

  @Mutation(() => PetOutputDTO)
  async createPet(
    @Args('PetInputDTO') petInputDTO: PetInputDTO,
  ): Promise<PetOutputDTO> {
    const petOut = await this.petService.createPet(petInputDTO);
    return petOut;
  }
}
