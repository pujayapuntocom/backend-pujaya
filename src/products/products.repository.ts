import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Category } from 'src/category/entities/category.entity';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async createProduct(createProductDto: CreateProductDto) {
    console.log(createProductDto);
    const newProduct = await this.productRepository.save(createProductDto);
    if (!newProduct) {
      throw new BadRequestException();
    }

    return newProduct;
  }

  async findAll(limit, page) {
    const [data] = await this.productRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
    return data;
  }

  async findOne(id: string) {
    const oneProduct = await this.productRepository.findOneBy({ id });
    if (!oneProduct) {
      return new BadRequestException();
    }
    return oneProduct;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const oneProduct = await this.findOne(id);
    if (!oneProduct) {
      throw new BadRequestException();
    }

    const oneProductUpdate = { ...oneProduct, ...updateProductDto };
    this.productRepository.save(oneProductUpdate);

    return oneProductUpdate;
  }

  async delete(id: string) {
    const product = await this.findOne(id);
    if (product) {
      await this.productRepository
        .createQueryBuilder()
        .delete()
        .from(Product)
        .where({ id })
        .execute();
      return id;
    }
    throw new Error('Producto no encontrado');
  }
}
