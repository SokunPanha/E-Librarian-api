import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema()
export class Location extends Document {
  
  @Prop()
  cabinet: string
  @Prop()
  shelve: string
  @Prop()
  drawer: string
}

export const LocationSchema = SchemaFactory.createForClass(Location);
