import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';

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

    @Put(':authorName')
    update(@Param('authorName') authorName: string) {
        return this.authorService.updateAuthor(authorName);
    }
  
}
