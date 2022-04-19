import { Repository, EntityRepository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { RegisterUserDto } from './dto/register-user.dto';

import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async register(authCredentialsDto: RegisterUserDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const user = new User();
    user.username = username;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);

    try {
      await user.save();
    } catch (error) {
      // 23505 = duplicate username
      if (error.code === '23505') {
        throw new ConflictException(
          `A user with username "${username}" already exists`,
        );
      }
      throw new InternalServerErrorException();
    }
  }

  async login(loginCredentialsDto: LoginCredentialsDto): Promise<string> {
    const { username, password } = loginCredentialsDto;

    const user = await this.findOne({ username });

    if (user && (await user.validatePassword(password))) {
      return user.username;
    } else {
      return null;
    }
  }

  private async hashPassword(password: string, salt: string) {
    return await bcrypt.hash(password, salt);
  }
}
