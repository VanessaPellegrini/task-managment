import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { AuthCredentialsDto } from '../tasks/dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersRepository: UsersRepository) {}

  async signUp(authCredentials: AuthCredentialsDto): Promise<void> {
    return this.usersRepository.createUser(authCredentials);
  }

  async signIn(authCredentials: AuthCredentialsDto): Promise<string> {
    const { username, password } = authCredentials;
    const user = await this.usersRepository.findUserByName(username);

    if (user && (await bcrypt.compare(password, user.password))) {
      return 'success';
    }
    throw new UnauthorizedException('Please check your login credentials');
  }
}
