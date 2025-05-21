import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    required: true,
    description: 'Debes ingresar el nombre del producto',
    example: 'Dodge Dard 1971',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  // @ApiProperty({
  //   required: true,
  //   description:
  //     'Debes elegir almenos una imagen del producto maximo 3 imagenes',
  // })
  // @IsString()
  // @IsNotEmpty()
  // imgProduct: [string];

   @ApiProperty({
    required: true,
    description: 'Debes ingresar el detalle del producto',
    example: 'Dodge Dard 1971',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    required: true,
    description: 'Debes ingresar el monto inicial de la subasta',
    example: 200,
  })
  @IsInt()
  @IsNotEmpty()
  initialPrice: number;

  @ApiProperty({
    description: 'Debes ingresar el monto final esperado',
    example: 500,
  })
  @IsInt()
  @IsNotEmpty()
  finalPrice: number;
}
