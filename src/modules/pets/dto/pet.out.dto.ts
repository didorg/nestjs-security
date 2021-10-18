import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IsAlpha, IsNotEmpty } from 'class-validator';
import { OwnerOutputDTO } from 'src/modules/owners/dto/owner.out.dto';

@ObjectType()
export class PetOutputDTO {
  @Field(type => Int)
  id: number;

  @Field()
  @IsNotEmpty()
  @IsAlpha()
  name: string;

  @Field({ nullable: true })
  type?: string;

  @Field({ nullable: true })
  owner?: OwnerOutputDTO;
}
