import { Field, InputType, Int } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@InputType()
export class UserInputDTO {
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
