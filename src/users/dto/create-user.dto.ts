import { Roles } from '../enums/roles';

export class CreateUserDto {
  name: string;
  password: string;
  confirmPasword: string;
  email: string;
  country: string;
  city: string;
  addres: string;
  phone: string;
  typeUser: [Roles];
  imgP: string;
}
