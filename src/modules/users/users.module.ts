import { Module } from '@nestjs/common';
import { UserRepository } from 'src/persistence/repositories/user.repository';
import { UsersService } from './users.service';

@Module({
  imports: [],
  providers: [UsersService, UserRepository],
  exports: [UsersService],
})
export class UsersModule {}
