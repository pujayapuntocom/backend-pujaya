import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    required: true,
    description: 'The name of the user',
    example: 'John Doe',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @ApiProperty({
    required: true,
    description: 'The email of the user',
    example: '2BdPd@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    required: true,
    description: 'The password of the user',
    example: 'Password123-',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(15)
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: string;

  @ApiProperty({
    required: true,
    description: 'The confirm password of the user',
    example: 'Password123-',
  })
  @IsNotEmpty()
  confirmPassword: string;

  @ApiProperty({
    required: false,
    description: 'The image profile of the user',
    example: 'https://example.com/profile.jpg',
  })
  @IsOptional()
  @IsString()
  imgProfile?: string; // Imagen opcional

  @ApiProperty({
    required: true,
    description: 'The phone number of the user',
    example: '1234567890',
  })
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty({
    required: true,
    description: 'The country of the user',
    example: 'Colombia',
  })
  @IsNotEmpty()
  @IsString()
  country: string;

  @ApiProperty({
    required: true,
    description: 'The address of the user',
    example: 'Calle 123, Ciudad',
  })
  @IsNotEmpty()
  @IsString()
  address: string;
}
