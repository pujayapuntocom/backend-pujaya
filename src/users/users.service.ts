import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    Object.assign(user, createUserDto);
    return await this.usersRepository.create(user);
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.findAll();
  }

  async findOne(id: string): Promise<User> {
    return await this.usersRepository.findOne(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return await this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.remove(id);
  }
}
