import { Field, InputType, Int } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty } from "class-validator";

@InputType()
export class UserInputDTO {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field({ nullable: false })
  userName: string;

  @Field({ nullable: false })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field({ nullable: true })
  phoneNumber?: string;

  @Field()
  @IsNotEmpty()
  password: string;
}
