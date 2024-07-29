import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Types } from 'mongoose';


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
  author: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Category' })
  category: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Location' })
  location: Types.ObjectId;
}

export const BookSchema = SchemaFactory.createForClass(Book);
