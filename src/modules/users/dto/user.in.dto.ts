import { Field, InputType, Int } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty } from "class-validator";

@InputType()
export class UserInputDTO {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field({ nullable: true })
  userName?: string;

  @Field({ nullable: true })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field({ nullable: true })
  @IsNotEmpty()
  password: string;
}
