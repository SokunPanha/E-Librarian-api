import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { UUID } from 'bson';
import { Document } from 'mongoose';
import { Types } from 'mongoose';


@Schema()
export class Book extends Document {

  @Prop({required: true}) 
  bookCode: UUID;

  @Prop({ required: true })
  title: string;

  @Prop()
  quantity: number;

  @Prop()
  description: string;

  @Prop({required: true})
  imageUrl: string

  @Prop()
  publicId: string

  @Prop({})
  qrCodeUrl: string

  @Prop({ type: Types.ObjectId, ref: 'Author' })
  author: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Category' })
  category: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Location' })
  location: Types.ObjectId;
}

export const BookSchema = SchemaFactory.createForClass(Book);
