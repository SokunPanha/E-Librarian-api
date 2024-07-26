import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from 'src/model/category.schema';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
    constructor(@InjectModel(Category.name) private categoryModel: Model<Category>) { }

    create(createCategoryDto: CreateCategoryDto) {
        const createCategory = new this.categoryModel(createCategoryDto);
        return createCategory.save();
    }

    getAllCategory() {
        return 'Get all categories';
    }

    getCategoryById(id: string) {
        return `Get category by id: ${id}`;
    }

    updateCategory(id: string, updateAuthorDto: UpdateCategoryDto) {
        return `Update category: ${id} sucessfullly`;
    }

    deleteCategory(id: string) {
        return `Delete category: ${id} sucessfullly`;
    }
}
