import { Injectable, NotFoundException } from '@nestjs/common';
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

    async getAllCategory(): Promise<Category[]> {
        return this.categoryModel.find().exec();
      }
    
      async getCategoryById(id: string): Promise<Category> {
        const category = await this.categoryModel.findById(id).exec();
        if (!category) {
          throw new NotFoundException(`Category with ID ${id} not found`);
        }
        return category;
      }
    
      async updateCategory(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
        const updatedCategory = await this.categoryModel.findByIdAndUpdate(id, updateCategoryDto, { new: true }).exec();
        if (!updatedCategory) {
          throw new NotFoundException(`Category with ID ${id} not found`);
        }
        return updatedCategory;
      }
    
      async deleteCategory(id: string): Promise<{ deletedCount?: number }> {
        const result = await this.categoryModel.deleteOne({ _id: id }).exec();
        if (result.deletedCount === 0) {
          throw new NotFoundException(`Category with ID ${id} not found`);
        }
        return result;
      }
}
