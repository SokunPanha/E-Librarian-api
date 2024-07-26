import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAuthorDto } from './dto/create-author.dto';
import { Author } from 'src/model/author.schema';

@Injectable()
export class AuthorService {
    constructor(@InjectModel(Author.name) private authorModel: Model<Author>) { }

    create(createAuthorDto: CreateAuthorDto) {
        const createdAuthor = new this.authorModel(createAuthorDto);
        return createdAuthor.save();
    }

    getAllAuthor() {
        return 'Get all authors';
    }

    getAuthorById(id: string) {
        return `Get author by id: ${id}`;
    }

    updateAuthor(authorName: string) {
        return `Update author: ${authorName} sucessfullly`;
    }
}