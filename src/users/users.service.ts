import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
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

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async removeInactiveUsers() {
    const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;
    const now = new Date();
    const users = await this.usersRepository.findAll();
    const toDelete = users.filter(
      (user) =>
        !user.isActive &&
        user.deactivatedAt &&
        now.getTime() - new Date(user.deactivatedAt).getTime() > THIRTY_DAYS,
    );
    for (const user of toDelete) {
      await this.usersRepository.deletePermanently(user.id);
    }
    if (toDelete.length > 0) {
      console.log(`Users deleted permanently: ${toDelete.length}`);
    }
  }
}
