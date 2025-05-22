import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { CategoryRepository } from './category.repository';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: CategoryRepository,
  ) {}

  async create(category: Category) {
    return await this.categoryRepository.create(category);
  }

  async findAll(page: number , limit: number){
    return await this.categoryRepository.findAll(page, limit);
  }

  async findOne(id: string) {
    return await this.categoryRepository.findOne(id);
  }

  async update(id: string, category: Category) {
    return await this.categoryRepository.update(id, category);
  }

  // remove(id: number) {
  //   return `This action removes a #${id} category`;
  // }
}
