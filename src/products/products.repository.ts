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

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    console.log(createProductDto);
    const newProduct = await this.productRepository.save(createProductDto);
    if (!newProduct) {
      throw new BadRequestException('No ha sido creado el producto Ha ocurrido un error');
    }

    return newProduct;
  }

  async findAll(limit: number, page:number): Promise<Product[]> {
    const [data] = await this.productRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
    if(!data) {
        throw new BadRequestException('Error al solicitar los productos a la base de datos')
    }
    return data;
  }

  async findOne(id: string): Promise<Product | BadRequestException> {
    const oneProduct = await this.productRepository.findOneBy({ id });
    if (!oneProduct) {
      return new BadRequestException('No existe un producto con ese id');
    }
    return oneProduct;
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const oneProduct = await this.findOne(id);
    if (oneProduct instanceof Product) {
      const oneProductUpdate: Product = { ...oneProduct, ...updateProductDto };
      await this.productRepository.save(oneProductUpdate);

      return oneProductUpdate;
    }

    throw new BadRequestException('No existe un producto con es id');
  }

  async delete(id: string): Promise<string> {
    let product: Product | BadRequestException = await this.findOne(id);
    if (!product) {
      throw new Error('Producto no encontrado');
    }
    const deleteProduct = { ...product, isActive: false };
    await this.productRepository
      .createQueryBuilder()
      .update(Product)
      .set(deleteProduct)
      .where({ id })
      .execute();
    return id;
  }
}
