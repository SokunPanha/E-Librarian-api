import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema()
export class Author {
  @Prop()
  authorName: string
}

export const AuthorSchema = SchemaFactory.createForClass(Author);
