import { Role } from "src/model/user.schema"

export class RegisterUserDto {
    _id?: string
    userName: string
    email: string
    password: string
    role?: Role
}

export class LoginUserDto {
    email: string
    password: string
}

