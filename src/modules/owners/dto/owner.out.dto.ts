import {Field, Int, ObjectType } from '@nestjs/graphql';
import { PetOutputDTO } from 'src/modules/pets/dto/pet.out.dto';
import { IsAlpha, IsNotEmpty } from 'class-validator';

@ObjectType()
export class OwnerOutputDTO {
  @Field(() => Int, { description: 'description (placeholder)' })
  id: number;

  @Field()
  @IsNotEmpty()
  @IsAlpha()
  name: string;

  @Field(() => [PetOutputDTO], {nullable: true})
  pets: PetOutputDTO[];
}
