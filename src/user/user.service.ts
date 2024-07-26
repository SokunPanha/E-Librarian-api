import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/model/user.schema';
import { Model } from 'mongoose';
@Injectable()
export class UserService {

  constructor(@InjectModel(User.name) private userModel: Model<User>){}

  create(createUserDto: CreateUserDto) {
    throw new HttpException("error", HttpStatus.FORBIDDEN)
    const newUser = new this.userModel(createUserDto)

    return newUser.save
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
