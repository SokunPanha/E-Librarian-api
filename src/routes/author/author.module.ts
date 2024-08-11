// src/author/author.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthorService } from './author.service';
import { AuthorController } from './author.controller';
import { Author, AuthorSchema } from 'src/model/author.schema';
import { BookModule } from '../book/book.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Author', schema: AuthorSchema }]),
    BookModule,
  ],  providers: [AuthorService],
  controllers: [AuthorController],
  exports: [MongooseModule]
})
export class AuthorModule {}
