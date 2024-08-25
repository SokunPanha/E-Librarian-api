import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document, Types } from 'mongoose';
import { CreateAuthorDto } from './dto/create-author.dto';
import { Author } from 'src/model/author.schema';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { JsonResponse } from 'src/utilities/JsonResponse';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Book } from 'src/model/book.schema';

@Injectable()
export class AuthorService {
  constructor(
    @InjectModel(Author.name) private authorModel: Model<Author & Document>,
    @InjectModel('Book') private readonly bookModel: Model<Book>,
  ) {}

  async create(createAuthorDto: CreateAuthorDto): Promise<JsonResponse<any>> {
    try {
      const { authorName } = createAuthorDto;
      const existingUser = await this.authorModel.findOne({ authorName });

      if (existingUser) {
        throw new BadRequestException('This author is already existed!');
      }
      const createdLocation = new this.authorModel(createAuthorDto);
      const data = await createdLocation.save();
      if (data) {
        return new JsonResponse(
          'Fetch successfully',
          HttpStatus.ACCEPTED,
          data,
        );
      }
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async getAllAuthor(): Promise<JsonResponse<any>> {
    try {
      const authors = await this.authorModel.find().exec();
      if (authors) {
        return new JsonResponse(
          'Get All Authors',
          HttpStatus.ACCEPTED,
          authors,
        );
      }
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async getAuthorById(id: string): Promise<Author> {
    const author = await this.authorModel.findById(id).exec();
    if (!author) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }
    return author;
  }

  async updateAuthor(
    id: string,
    updateAuthorDto: UpdateAuthorDto,
  ): Promise<JsonResponse<any>> {
    const updatedAuthor = await this.authorModel
      .findByIdAndUpdate(id, updateAuthorDto, { new: true })
      .exec();
    if (!updatedAuthor) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }
    return new JsonResponse(
      'Updated successfully',
      HttpStatus.ACCEPTED,
      updateAuthorDto,
    );
  }

  async deleteAuthor(id: string): Promise<JsonResponse<any>> {
    try {
      // Ensure the ID is converted to ObjectId
      const authorId = new Types.ObjectId(id); 

      // Delete all books associated with the author
      const deleteBooksResult = await this.bookModel.deleteMany({ author: authorId }).exec();

      // Check if books were found
      if (deleteBooksResult.deletedCount === 0) {
        console.log(`No books were found with author ID ${id}`);
      }

      // Delete the author
      const result = await this.authorModel.deleteOne({ _id: authorId }).exec();
      if (result.deletedCount === 0) {
        throw new NotFoundException(`Author with ID ${id} not found`);
      }

      return new JsonResponse('Deleted successfully', HttpStatus.ACCEPTED, {
        deleteCount: result.deletedCount
      });
    } catch (error) {
      throw new BadRequestException(error.message || 'An error occurred while deleting the author');
    }
  }
}
