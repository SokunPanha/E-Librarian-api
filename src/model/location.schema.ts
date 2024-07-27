import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema()
export class Location {
  @Prop()
  cabinet: string
  @Prop()
  shelve: string
  @Prop()
  drawer: string
}

export const LocationSchema = SchemaFactory.createForClass(Location);
