import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/persistence/repositories/user.repository';
import { AuthService } from '../auth/services/auth.service';
import { UserResolver } from './resolvers/user.resolver';
import { UsersService } from './services/users.service';


@Module({
  imports: [TypeOrmModule.forFeature([UserRepository])],
  providers: [UsersService, UserResolver, AuthService],
  exports: [TypeOrmModule],
  controllers:[],
})
export class UsersModule {}
