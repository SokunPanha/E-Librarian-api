import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Book } from 'src/model/book.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { JsonResponse } from 'src/utilities/JsonResponse';

@Injectable()
export class BookService {
    constructor(@InjectModel(Book.name) private bookModel: Model<Book>) { }

    async create(createBookDto: CreateBookDto): Promise<JsonResponse<any>>{
        const { author, category, location, title, bookCode, quantity, description, imageUrl, qrCodeUrl, publicId } = createBookDto;

        const existingBook = await this.bookModel.findOne({title, author: new Types.ObjectId(author)})

        if (!Types.ObjectId.isValid(author) || !Types.ObjectId.isValid(category) || !Types.ObjectId.isValid(location)) {
            throw new BadRequestException('Invalid ObjectId');
        }

        if (existingBook) {
            throw new BadRequestException('This book is already existed');
        }

       try{
        const newBook = new this.bookModel({
            title,
            bookCode,
            quantity,
            description,
            imageUrl,
            publicId,
            qrCodeUrl,
            author: new Types.ObjectId(author),
            category: new Types.ObjectId(category),
            location: new Types.ObjectId(location),
        });

        const createdBook = newBook.save()
        return  new JsonResponse( "Book created successfully", HttpStatus.CREATED, createdBook)

       }
       catch(error){
        console.log(error.name)
       }
    }

    async getAllBook(): Promise<JsonResponse<any>> {
        try{

            const books = await this.bookModel.find().populate('author category location').exec();
            return new JsonResponse("get books", HttpStatus.ACCEPTED, books)
        }catch{

        }
    }

    async getBookById(id: string): Promise<Book> {
        if (!Types.ObjectId.isValid(id)) {
            throw new BadRequestException('Invalid ObjectId');
        }
        return this.bookModel.findById(id).populate('author category location').exec();
    }

    async updateBook(id: string, updateBookDto: UpdateBookDto) {
        try{
            const updatedBook = await this.bookModel.findByIdAndUpdate(id, updateBookDto, { new: true }).exec();
            if (!updatedBook) {
              throw new NotFoundException(`Book with ID ${id} not found`);
            }
            return new JsonResponse("Updated Book successfully", HttpStatus.ACCEPTED, updatedBook)
           }
           catch(error){
            throw new BadRequestException(error)
           }
    }

    async deleteBook(id: string): Promise<JsonResponse<any>> {
        try{
          const result = await this.bookModel.deleteOne({ _id: id }).exec();
          if (result.deletedCount === 0) {
            throw new NotFoundException(`Book with ID ${id} not found`);
          }
          return new JsonResponse("Book has been deleted!", HttpStatus.ACCEPTED, {deleteCount: result.deletedCount});
        }catch(error){
          throw new BadRequestException(error)
        }
      }
}



