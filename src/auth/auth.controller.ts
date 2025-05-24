import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-auth.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('singin')
  async singIn(@Body() login: LoginUserDto) {
    return this.authService.singIn(login.email, login.password);
  }

  @Post('singup')
  async singUp(@Body() createUser: CreateUserDto) {
return this.authService.singUp(createUser);
}
}