import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from '../tasks/dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly userEntityRepository: Repository<User>,
  ) {}

  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = this.userEntityRepository.create({
      username,
      password: hashedPassword,
    });

    try {
      await this.userEntityRepository.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already in use');
      }
      throw new InternalServerErrorException();
    }
  }

  async findUserByName(username: string): Promise<User> {
    const usernameFound = await this.userEntityRepository.findOneBy({
      username,
    });
    if (!usernameFound) {
      throw new NotFoundException(`The "${usernameFound}" is not found`);
    }
    return usernameFound;
  }
}
