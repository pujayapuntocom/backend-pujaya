import { ApiProperty } from '@nestjs/swagger';

export class CreateAuctionDto {
  @ApiProperty({
    required: true,
    description: 'Debe ingresar el Un nombre para la subasta',
    example: 'Subasta de Dodge Dard 1971',
  })
  name: string;

  @ApiProperty({
    required: true,
    description: 'Debe ingresar el ID de un usuario premium',
  })
  idCreator: string;

  @ApiProperty({
    required: true,
    description: 'Debe ingresar el ID de un usuarios premium',
  })
  idBuyers: [string];
}
