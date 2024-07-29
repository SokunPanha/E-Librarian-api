import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Book } from 'src/model/book.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BookService {
    constructor(@InjectModel(Book.name) private bookModel: Model<Book>) { }

    async create(createBookDto: CreateBookDto): Promise<Book> {
        const { author, category, location, title, code, quantity, description } = createBookDto;

        if (!Types.ObjectId.isValid(author) || !Types.ObjectId.isValid(category) || !Types.ObjectId.isValid(location)) {
            throw new BadRequestException('Invalid ObjectId');
        }

        const newBook = new this.bookModel({
            title,
            code,
            quantity,
            description,
            author: new Types.ObjectId(author),
            category: new Types.ObjectId(category),
            location: new Types.ObjectId(location),
        });

        return newBook.save();
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
