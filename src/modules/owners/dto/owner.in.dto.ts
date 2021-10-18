import { InputType, Int, Field } from '@nestjs/graphql';
import { IsAlpha, IsNotEmpty } from 'class-validator';
import { PetInputDTO } from 'src/modules/pets/dto/pet.in.dto';


@InputType()
export class OwnerInputDTO {
  @Field(() => Int, { nullable: true,  description: 'description (placeholder)'})
  id: number;

  @Field()
  @IsNotEmpty()
  @IsAlpha()
  name: string;

  @Field(() => PetInputDTO)
  pets: PetInputDTO[];
}
