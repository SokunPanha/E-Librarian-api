import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Category } from 'src/model/category.schema';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { JsonResponse } from 'src/utilities/JsonResponse';
import { Book } from 'src/model/book.schema';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
    @InjectModel('Book') private readonly bookModel: Model<Book>,
  ) {}

  async create(
    createCategoryDto: CreateCategoryDto,
  ): Promise<JsonResponse<any>> {
    try {
      const { categoryName } = createCategoryDto;
      const existingCategory = await this.categoryModel.findOne({
        categoryName,
      });

      if (existingCategory) {
        throw new BadRequestException('This category is already existed');
      }

      const createCategory = new this.categoryModel(createCategoryDto);
      const newCategory = await createCategory.save();
      return new JsonResponse(
        'Category Created!',
        HttpStatus.CREATED,
        newCategory,
      );
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async getAllCategory(): Promise<JsonResponse<any>> {
    try {
      const categories = await this.categoryModel.find().exec();
      return new JsonResponse(
        'Get All Categories',
        HttpStatus.ACCEPTED,
        categories,
      );
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async getCategoryById(id: string): Promise<JsonResponse<any>> {
    try {
      const category = await this.categoryModel.findById(id).exec();
      if (!category) {
        throw new NotFoundException(`Category with ID ${id} not found`);
      }
      return new JsonResponse('Get a category', HttpStatus.ACCEPTED, category);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async updateCategory(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<JsonResponse<any>> {
    try {
      const updatedCategory = await this.categoryModel
        .findByIdAndUpdate(id, updateCategoryDto, { new: true })
        .exec();
      if (!updatedCategory) {
        throw new NotFoundException(`Category with ID ${id} not found`);
      }
      return new JsonResponse(
        'Updated category successfully',
        HttpStatus.ACCEPTED,
        updatedCategory,
      );
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async deleteCategory(id: string): Promise<JsonResponse<any>> {
    try {
      const categoryId = new Types.ObjectId(id);

      const deleteBooksResult = await this.bookModel
        .deleteMany({ category: categoryId })
        .exec();

      if (deleteBooksResult.deletedCount === 0) {
        console.log(`No books were found with category ID ${id}`);
      }
      
      const result = await this.categoryModel
        .deleteOne({ _id: categoryId })
        .exec();
      if (result.deletedCount === 0) {
        throw new NotFoundException(`Category with ID ${id} not found`);
      }

      return new JsonResponse('Deleted successfully', HttpStatus.ACCEPTED, {
        deletedCategoryCount: result.deletedCount,
        deletedBooksCount: deleteBooksResult.deletedCount,
      });
    } catch (error) {
      throw new BadRequestException(
        error.message || 'An error occurred while deleting the category',
      );
    }
  }
}
