import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import User from "src/persistence/entities/user/user.entity";
import { UserRepository } from "src/persistence/repositories/user.repository";
import { UserInputDTO } from "./dto/user.in.dto";

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

  async createUser(userIn: UserInputDTO): Promise<User> {
    const userCreated: User = await this.userRepository.create(userIn);
    await this.userRepository.save(userCreated);
    return userCreated;
  }
}
