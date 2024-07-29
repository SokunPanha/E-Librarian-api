import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from 'src/model/book.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BookService {
    constructor(@InjectModel(Book.name) private bookModel: Model<Book>) { }

    create(createBookDto: CreateBookDto) {
        const createdBook = new this.bookModel(createBookDto);
        return createdBook.save();
    }

    updateBook(id: string, updateBookDto: UpdateBookDto) {
        return `Update book: ${id} sucessfullly`;
    }

    deleteBook(id: string) {
        return `Delete book: ${id} sucessfullly`;
    }

    
}
