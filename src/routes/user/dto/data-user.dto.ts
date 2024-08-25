import { IsEmail } from "class-validator";
import { Types } from "mongoose"

export class UserData{
    _id: Types.ObjectId
    username: string
    @IsEmail()
    email: string;
    password: string;
    role: string;
}