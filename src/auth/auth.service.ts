import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { AuthCredentialsDto } from '../tasks/dto/auth-credentials.dto';

@Injectable()
export class AuthService {
  constructor(private usersRepository: UsersRepository) {}

  async signUp(authCredentials: AuthCredentialsDto): Promise<void> {
    return this.usersRepository.createUser(authCredentials);
  }
}
