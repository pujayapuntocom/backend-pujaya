import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiTags } from '@nestjs/swagger';
import { Category } from './entities/category.entity';

@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(@Body() category: CreateCategoryDto) {
    return await this.categoryService.create(category);
  }

  @Get()
  async findAll( @Query('page') page: number = 1, @Query('limit') limit: number = 5) {
    return await this.categoryService.findAll(page, limit);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.categoryService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() category: UpdateCategoryDto,
  ) {
    return await this.categoryService.update(id, category);
  }

@Delete(':id')
async delete(@Param('id') id: string) {
  return await this.categoryService.delete(id);
}
}
