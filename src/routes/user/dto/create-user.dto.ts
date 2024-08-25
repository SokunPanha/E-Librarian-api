import { IsEmail } from "@nestjs/class-validator";

export class CreateUserDto {
    username: string
    email: string;
    password: string;
    role: string;
}