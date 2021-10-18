import { Field, InputType, Int } from '@nestjs/graphql';
import { IsAlpha, IsNotEmpty } from 'class-validator';
import { OwnerInputDTO } from 'src/modules/owners/dto/owner.in.dto';

@InputType()
export class PetInputDTO {
  @Field(() => Int, { nullable: true })
  id: number;

  @Field()
  @IsNotEmpty()
  @IsAlpha()
  name: string;

  @Field({ nullable: true })
  type?: string;

  @Field({ nullable: true })
  owner?: OwnerInputDTO;
}
