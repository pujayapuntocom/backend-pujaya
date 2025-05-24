import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginUserDto } from './dto/login-auth.dto';
import { UsersRepository } from 'src/users/users.repository';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(private readonly usersRepository: UsersRepository, 
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  async singIn(email: string, password: string) {
    const user = await this.usersRepository.findOne(email);
    if (!user) {
      throw new BadRequestException('Usuario no encontrado');
    }
    if (user.password !== password) {
      throw new BadRequestException('Correo o Contraseña incorrectas');
    }
    return user;
  }

  async singUp(createUser: CreateUserDto) {
    const newUser = await this.usersRepository.findOne(createUser.email);
    
    if (newUser) {
      throw new BadRequestException('El usuario ya existe');
    }
    const user = await this.userRepository.create(createUser);
    await this.userRepository.save(user);

    return createUser;
}
}