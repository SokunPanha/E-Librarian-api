import { ConflictException, HttpCode, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterUserDto, LoginUserDto } from './dto/create-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/model/user.schema';
import * as bcrypt from "bcrypt"
@Injectable()
export class AuthService {

  constructor(@InjectModel(User.name) private userModel: Model<User>){}

  async register(registerUserDto: RegisterUserDto): Promise<User> {
    const {userName, email, password} = registerUserDto
    const hashPassword = await bcrypt.hash(password, 10)
    const newUser = new this.userModel({
      userName,
      email,
      password: hashPassword
    })
    try {
      return await newUser.save();
    } catch (error) {
      if (error.code === 11000) { // Duplicate key error
        throw new ConflictException('Email already exists');
      }
      throw error;
    }
  }

  async login(loginUserDto: LoginUserDto){
    const existingUser = await this.findUser(loginUserDto.email)
    const checkPassword = await bcrypt.compare(loginUserDto.password, existingUser.password)
    if(existingUser && checkPassword){
      return {
        status: 200,
        message: "login successfully!",
        data: {
          id: existingUser._id,
          role: existingUser.role
        }
      }
    }else{
      throw new HttpException({ status: HttpStatus.UNAUTHORIZED, message: "Wrong credentail!"}, HttpStatus.UNAUTHORIZED)
    }
  }

  findUser(email: string): Promise<RegisterUserDto>{
    return this.userModel.findOne({email})
  }
}
