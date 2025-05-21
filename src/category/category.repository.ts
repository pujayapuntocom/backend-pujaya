import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "./entities/category.entity";
import { User } from "src/users/entities/user.entity";


import { Repository } from "typeorm";

export class CategoryRepository {
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>

    async create(category: Category) {
        const newCategory = await this.categoryRepository.save(category)

        return newCategory
    }
    
    async findAll(page: number = 1, limit: number = 5): Promise<Partial<User>[]> { 
        let category = await this.categoryRepository.find()

        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + +limit;

        category = category.slice(startIndex, endIndex);

        return category
    }

    async findOne(id: string) {
        const category = await this.categoryRepository.findOne({
            where: {id},
            relations: {products: true},
        });
        if (!category) {
            return 'Category not found';
        }
        return category;
    }

    async update (id: string, category: Category) {
    await this.categoryRepository.update(id, category)
    const updateCategory = await this.categoryRepository.findOne({ 
        where: { id } 
    })
    return updateCategory
    
    }
    

}

