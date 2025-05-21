import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.usersService.create(createUserDto);
    } catch (error) {
      throw new InternalServerErrorException('Error to create user');
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.usersService.findAll();
    } catch (error) {
      throw new InternalServerErrorException('Error to get users');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const user = await this.usersService.findOne(id);
      if (!user) throw new NotFoundException(`User with id ${id} not found`);
      return user;
    } catch (error) {
      throw new InternalServerErrorException('Error to get user');
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      const user = await this.usersService.update(id, updateUserDto);
      if (!user) throw new NotFoundException(`User with id ${id} not found`);
      return user;
    } catch (error) {
      throw new InternalServerErrorException('Error to update user');
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const user = await this.usersService.findOne(id);
      if (!user) throw new NotFoundException(`User with id ${id} not found`);
      await this.usersService.remove(id);
      return { message: `User with id ${id} deleted` };
    } catch (error) {
      throw new InternalServerErrorException('Error to delete user');
    }
  }
}
