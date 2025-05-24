import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { AuctionsService } from './auctions.service';
import { CreateAuctionDto } from './dto/create-auction.dto';
import { UpdateAuctionDto } from './dto/update-auction.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('auctions')
export class AuctionsController {
  constructor(private readonly auctionsService: AuctionsService) {}

  @ApiOperation({
    summary: 'Crear una subasta',
  })
  @Post()
  create(@Body() createAuctionDto: CreateAuctionDto) {
    return this.auctionsService.create(createAuctionDto);
  }

  @ApiOperation({
    summary: 'Obtener las Subastas',
  })
  @Get()
  findAll(@Query('limit') limit: number, @Query('page') page: number) {
    return this.auctionsService.findAll(limit ? limit : 10, page ? page : 1);
  }

  @ApiOperation({
    summary: 'Obtener una subasta por su ID',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.auctionsService.findOne(id);
  }

  @ApiOperation({
    summary: 'Actualizar los datos de una subasta',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuctionDto: UpdateAuctionDto) {
    return this.auctionsService.update(id, updateAuctionDto);
  }

    @ApiOperation({
    summary: 'Inactivar una subasta'
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.auctionsService.remove(id);
  }
}
