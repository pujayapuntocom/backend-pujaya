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
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('products')
@ApiTags('Products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

 
  @ApiOperation({summary:'Crear producto'})
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @ApiOperation({summary:'Obtener productos paginados'})
  @Get()
  findAll(@Query('limit') limit:number, @Query('page') page: number) {
    return this.productsService.findAll(!limit ? 10 : limit, !page ? 1 : page);
  }

  
  @ApiOperation({summary:'Obtener producto por ID'})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }


  @ApiOperation({summary:'Actualizar productos por ID'})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }


  @ApiOperation({summary:'Inactivar producto por ID'})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
