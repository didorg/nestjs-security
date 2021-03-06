import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import User from "src/persistence/entities/user/user.entity";
import { UserRepository } from "src/persistence/repositories/user.repository";
import { UserInputDTO } from "../dto/user.in.dto";
import { UserOutputDTO } from "../dto/user.out.dto";

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async getByEmail(email: string): Promise<User> {
    const user: User = await this.userRepository.findOneOrFail({ email });
    if (user) {
      return user;
    }
    throw new HttpException(
      "User with this email does not exist",
      HttpStatus.NOT_FOUND
    );
  }

  async checkEmail(email: string): Promise<boolean> {
    let sameEmail = false;
    const user: User = await this.userRepository.findOne({ email });
    if (user) {
      sameEmail = email === user.email ? true : false;
    }
    return sameEmail;
  }

  async findAll() {
    return "A list of users";
  }

  // AuthService return the UserOutputDTO with the token
  async createUser(userIn: UserInputDTO): Promise<User> {
    const userCreated: User = this.userRepository.create(userIn);
    const user: User = await this.userRepository.save(userCreated);
    return user;
  }
}
