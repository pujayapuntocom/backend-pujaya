import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAuctionDto {
  @ApiProperty({
    required: true,
    description: 'Debes ingresar el nombre de la subasta',
    example: 'Subasta de Dodge Dard 1971',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    required: true,
    description: 'Debes ingresar el Id de un usuario premiun',
  })
  idCreator: string;

  @ApiProperty({
    required: true,
    description: 'Debes ingresar los Id de los usuarios premiun',
  })
  idBuyers: [string];
}
