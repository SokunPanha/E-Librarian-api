import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Types } from 'mongoose';
import { Author } from './author.schema';
import { Category } from './category.schema';
import { Location } from './location.schema';

@Schema()
export class Book extends Document {

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  code: string;

  @Prop()
  quantity: number;

  @Prop()
  description: string;

  @Prop({ type: Types.ObjectId, ref: 'Author' })
  author: Author;

  @Prop({ type: Types.ObjectId, ref: 'Category' })
  category: Category;

  @Prop({ type: Types.ObjectId, ref: 'Location' })
  location: Location;
}

export const BookSchema = SchemaFactory.createForClass(Book);
