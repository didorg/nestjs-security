import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UsersService } from "../../users/services/users.service";
import { hashSync, genSaltSync, compareSync } from "bcrypt";
import { IUser } from "../../users/dto/user.interface";
import { UserInputDTO } from "../../users/dto/user.in.dto";
import { UserOutputDTO } from "../../users/dto/user.out.dto";
import User from "src/persistence/entities/user/user.entity";

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  public async register(iuser: IUser): Promise<UserOutputDTO> {
    if (!(await this.usersService.checkEmail(iuser.email))) {
      const hashedPassword = hashSync(iuser.password, genSaltSync(10));
      try {
        const userInt: UserInputDTO = new UserInputDTO();
        userInt.userName = iuser.userName;
        userInt.email = iuser.email;
        userInt.password = hashedPassword;
        // Create User with the hashedPassword
        const user: User = await this.usersService.createUser(userInt);
        // mapping user to UserOutputDTO
        const userOut: UserOutputDTO = await this.mapperUserToUserOutDTO(user);
        return userOut;
      } catch (error) {
        throw new HttpException(
          "Something went wrong",
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    } else
      throw new HttpException(
        `The email: ${iuser.email} already exist`,
        HttpStatus.FOUND
      );
  }

  public async login(email: string, password: string): Promise<UserOutputDTO> {
    try {
      const user = await this.usersService.getByEmail(email);
      await this.verifyPassword(password, user.password);
      const userOut: UserOutputDTO = await this.mapperUserToUserOutDTO(user);
      return userOut;
    } catch (error) {
      throw new HttpException(
        "Wrong credentials provided",
        HttpStatus.BAD_REQUEST
      );
    }
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean> {
    const isPasswordMatching: boolean = compareSync(
      plainTextPassword,
      hashedPassword
    );
    if (!isPasswordMatching) {
      throw new HttpException(
        "Wrong credentials provided",
        HttpStatus.BAD_REQUEST
      );
    }
    return isPasswordMatching;
  }

  public async mapperUserToUserOutDTO(user: User): Promise<UserOutputDTO> {
    const userOut: UserOutputDTO = new UserOutputDTO();
    userOut.userName = user.userName;
    userOut.email = user.email;

    return userOut;
  }
}
