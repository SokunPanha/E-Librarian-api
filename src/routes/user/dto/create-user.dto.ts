import { IsEmail } from "@nestjs/class-validator";

export class CreateUserDto {
    username: string;
    @IsEmail()
    email: string;
    password: string;
    role: string;
}