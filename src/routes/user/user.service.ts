import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/model/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { JsonResponse } from 'src/utilities/JsonResponse';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<JsonResponse<any>> {
    try {
      const { username } = createUserDto;
      const existingUser = await this.userModel.findOne({ username }).exec();

      if (existingUser) {
        throw new BadRequestException('This user is already existed!');
      }

      const createdUser = new this.userModel(createUserDto);
      const data = await createdUser.save();
      if (data) {
        return new JsonResponse(
          'Fetch successfully',
          HttpStatus.ACCEPTED,
          data,
        );
      }
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findUser(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async getAllUser(): Promise<JsonResponse<any>> {
    try {
      const users = await this.userModel.find().exec();
      if (users) {
        return new JsonResponse('Get all users', HttpStatus.ACCEPTED, users);
      }
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User with id: ${id} not found!`);
    }
    return user;
  }

  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<JsonResponse<any>> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();

    if (!updatedUser) {
      throw new NotFoundException(`User with id: ${id} not found!`);
    }

    return new JsonResponse(
      'Updated successfully',
      HttpStatus.ACCEPTED,
      updatedUser,
    );
  }

  async deleteUser(id: string): Promise<JsonResponse<any>> {
    try {
      const result = await this.userModel.deleteOne({ _id: id }).exec();
      if (result.deletedCount === 0) {
        throw new NotFoundException(`Author with ID ${id} not found`);
      }
      return new JsonResponse(
        'Delete successfully',
        HttpStatus.ACCEPTED,
        result,
      );
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
