import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "./entities/category.entity";
import { Repository } from "typeorm";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { BadRequestException } from "@nestjs/common";

export class CategoryRepository {
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>

    async create(category: CreateCategoryDto) {
        const newCategory = await this.categoryRepository.save(category)

        return newCategory
    }
    
async findAll(page: number = 1, limit: number = 5): Promise<Partial<Category>[]> {
    let categories = await this.categoryRepository.find({
        where: { isActive: true },
    });

const startIndex = (page - 1) * limit;
const endIndex = startIndex + limit;

return categories.slice(startIndex, endIndex);
}


    async findOne(id: string) {
        const category = await this.categoryRepository.findOne({
            where: {id},
            relations: {products: true},
        });
        if (!category) {
            return 'Categoria no encontrada';
        }
        return category;
    }

    async update (id: string, category: UpdateCategoryDto) {
    await this.categoryRepository.update(id, category)
    const updateCategory = await this.categoryRepository.findOne({ 
        where: { id } 
    })
    return updateCategory
    
    }
    
async delete(id: string) {
    const category = await this.categoryRepository.findOne({ where: { id } });

if (!category) {
    throw new BadRequestException('Categoria no encontrada') ;
}

category.isActive = false;
await this.categoryRepository.save(category);

return {
    message: `La categoría con id ${id} fue eliminada.`,
    category,
};
}
}

