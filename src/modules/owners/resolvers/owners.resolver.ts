import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OwnerInputDTO } from '../dto/owner.in.dto';
import { OwnerOutputDTO } from '../dto/owner.out.dto';
import { OwnersService } from '../services/owners.service';

@Resolver(() => OwnerOutputDTO)
export class OwnersResolver {
  constructor(private readonly ownersService: OwnersService) {}

  @Query(() => [OwnerOutputDTO])
  async owners(): Promise<OwnerOutputDTO[]> {
    const owners = await this.ownersService.findAll();
    return owners;
  }

  @Query(() => OwnerOutputDTO)
  async owner(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<OwnerOutputDTO> {
    const owner = await this.ownersService.findOne(id);
    return owner;
  }

  @Mutation(() => OwnerOutputDTO)
  createOwner(@Args('OwnerInputDTO') ownerInputDTO: OwnerInputDTO): Promise<OwnerOutputDTO> {
    const ownerOut = this.ownersService.createOwner(ownerInputDTO);
    return ownerOut;
  }

  // @Query(() => [Owner], { name: 'owners' })
  // findAll() {
  //   return this.ownersService.findAll();
  // }

  // @Query(() => Owner, { name: 'owner' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.ownersService.findOne(id);
  // }

  // @Mutation(() => Owner)
  // updateOwner(@Args('updateOwnerInput') updateOwnerInput: OwnerOutputDTO) {
  //   return this.ownersService.update(updateOwnerInput.id, updateOwnerInput);
  // }

  // @Mutation(() => Owner)
  // removeOwner(@Args('id', { type: () => Int }) id: number) {
  //   return this.ownersService.remove(id);
  // }
}
