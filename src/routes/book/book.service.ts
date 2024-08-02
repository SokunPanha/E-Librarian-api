import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Book } from 'src/model/book.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BookService {
    constructor(@InjectModel(Book.name) private bookModel: Model<Book>) { }

    async create(createBookDto: CreateBookDto){
        const { author, category, location, title, bookCode, quantity, description, imageUrl, qrCodeUrl } = createBookDto;

        const exitingBook = await this.bookModel.findOne({title, author: new Types.ObjectId(author)})

        if (!Types.ObjectId.isValid(author) || !Types.ObjectId.isValid(category) || !Types.ObjectId.isValid(location)) {
            throw new BadRequestException('Invalid ObjectId');
        }

        if (exitingBook) {
            throw new BadRequestException('This book is already existed');
        }

       try{
        const newBook = new this.bookModel({
            title,
            bookCode,
            quantity,
            description,
            imageUrl,
            qrCodeUrl,
            author: new Types.ObjectId(author),
            category: new Types.ObjectId(category),
            location: new Types.ObjectId(location),
        });

        const createdBook = newBook.save()
        return {
            message: "Book created successfully",
            status: 201,
            data: createdBook
        }
       }
       catch(error){
        console.log(error.name)
       }
    }

    async getAllBook(): Promise<Book[]> {
        return this.bookModel.find().populate('author category location').exec();
    }

    async getBookById(id: string): Promise<Book> {
        if (!Types.ObjectId.isValid(id)) {
            throw new BadRequestException('Invalid ObjectId');
        }
        return this.bookModel.findById(id).populate('author category location').exec();
    }

    updateBook(id: string, updateBookDto: UpdateBookDto) {
        return `Update book: ${id} sucessfullly`;
    }

    deleteBook(id: string) {
        return `Delete book: ${id} sucessfullly`;
    }


}
