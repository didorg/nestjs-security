import { Field, Int, ObjectType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@ObjectType()
export class UserOutputDTO {
  @Field(() => Int, { nullable: true })
  id: number;

  @Field()
  @IsNotEmpty()
  userName: string;

  @Field({ nullable: true })
  @IsNotEmpty()
  email: string;

  @Field({ nullable: true })
  @IsNotEmpty()
  password: string;
}
