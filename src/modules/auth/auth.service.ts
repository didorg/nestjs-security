import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { hashSync, genSaltSync, compareSync } from "bcrypt";
import { IUser } from "../users/dto/user.interface";
import { UserInputDTO } from "../users/dto/user.in.dto";
import { UserOutputDTO } from "../users/dto/user.out.dto";
import User from "src/persistence/entities/user/user.entity";

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.getByEmail(email);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  public async register(iuser: IUser): Promise<UserOutputDTO> {
    const hashedPassword = hashSync(iuser.password, genSaltSync(10));
    try {
      const userInt: UserInputDTO = new UserInputDTO();
      userInt.email = iuser.email;
      userInt.password = hashedPassword;
      // Create User with the hashedPassword
      const user: User = await this.usersService.createUser(userInt);
      // mapping user to UserOutputDTO
      const userOut = await this.mapperUserToUserOutDTO(user, hashedPassword);
      return userOut;
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException(
          "User with that email already exists",
          HttpStatus.BAD_REQUEST
        );
      }
      throw new HttpException(
        "Something went wrong",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async getAuthenticatedUser(
    email: string,
    hashedPassword: string
  ): Promise<UserOutputDTO> {
    try {
      const user = await this.usersService.getByEmail(email);
      const isPasswordMatching: boolean = compareSync(
        user.password,
        hashedPassword
      );
      if (!isPasswordMatching) {
        throw new HttpException(
          "Wrong credentials provided",
          HttpStatus.BAD_REQUEST
        );
      }
      const userOut = await this.mapperUserToUserOutDTO(user, hashedPassword);
      return userOut;
    } catch (error) {
      throw new HttpException(
        "Wrong credentials provided",
        HttpStatus.BAD_REQUEST
      );
    }
  }

  public async mapperUserToUserOutDTO(user: User, hashedPassword: string) {
    const userOut: UserOutputDTO = new UserOutputDTO();
    userOut.email = user.email;
    userOut.token = hashedPassword;

    return userOut;
  }
}
