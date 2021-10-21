import { Field, Int, ObjectType } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@ObjectType()
export class UserOutputDTO {

  @Field()
  userName: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  token?: string;
}
