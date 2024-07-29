import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('book')
export class BookController {
    constructor(private readonly bookService: BookService) {}

    @Post()
    async create(@Body() createBookDto: CreateBookDto) {
      return this.bookService.create(createBookDto);
    }

    @Get()
    findAll() {
        return this.bookService.getAllBook();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.bookService.getBookById(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
        return this.bookService.updateBook(id, updateBookDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.bookService.deleteBook(id);
    }
}
