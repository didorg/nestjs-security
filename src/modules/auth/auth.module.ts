import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/services/users.service';
import { AuthService } from './services/auth.service';

@Module({
  imports: [UsersModule],
  providers: [AuthService, UsersService],
  exports:[AuthService],
})
export class AuthModule {}
