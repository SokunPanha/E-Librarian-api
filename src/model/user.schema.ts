import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export enum Role {
    ADMIN = "admin",
    USER = "user",
    GUEST = "guest"
}

@Schema()
export class User{
    @Prop()
    userName: string 

    @Prop({required: true, unique: true}) 
    email: string 

    @Prop()
    password: string 

    @Prop({required: true, enum: Role, default: Role.USER})
    role: Role
}

export const UserSchema = SchemaFactory.createForClass(User)
UserSchema.index({ email: 1 }, { unique: true });