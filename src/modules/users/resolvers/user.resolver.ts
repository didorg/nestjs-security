import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthService } from "src/modules/auth/services/auth.service";
import { UserInputDTO } from "../dto/user.in.dto";
import { IUser } from "../dto/user.interface";
import { UserOutputDTO } from "../dto/user.out.dto";
import { UsersService } from "../services/users.service";

@Resolver(() => UserOutputDTO)
export class UserResolver {
  constructor(
    private userService: UsersService,
    private authService: AuthService
  ) {}

  @Query(() => [UserOutputDTO])
  async users(): Promise<string> {
    const users = await this.userService.findAll();
    return users;
  }

  @Query(() => UserOutputDTO)
  async user(
    @Args("email", { type: () => String }) email: string
  ): Promise<UserOutputDTO> {
    const user = await this.userService.getByEmail(email);
    return user;
  }

  @Mutation(() => UserOutputDTO)
  async registerUser(
    @Args("UserInputDTO") userInputDTO: UserInputDTO
  ): Promise<UserOutputDTO> {
    const iUser = await this.mapperUserInputDTOToIUser(userInputDTO);
    const userOut = await this.authService.register(iUser);
    return userOut;
  }
  async mapperUserInputDTOToIUser(userInputDTO: UserInputDTO): Promise<IUser> {
    const user: IUser = {
      userName: userInputDTO.userName,
      email: userInputDTO.email,
      password: userInputDTO.password,
    };
    return user;
  }
}
