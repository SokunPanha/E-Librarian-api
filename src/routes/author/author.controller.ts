import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Controller('author')
export class AuthorController {
    constructor(private readonly authorService: AuthorService) {}

    @Post()
    async create(@Body() createAuthorDto: CreateAuthorDto) {
      return this.authorService.create(createAuthorDto);
    }

    @Get()
    findAll() {
        return this.authorService.getAllAuthor();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.authorService.getAuthorById(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateAuthorDto: UpdateAuthorDto) {
        return this.authorService.updateAuthor(id, updateAuthorDto);
    }

    @Delete(':id')
    deleteOne(@Param('id') id: string) {
        return this.authorService.deleteAuthor(id);
    }
  
}
