import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Location } from 'src/model/location.schema';
import { JsonResponse } from 'src/utilities/JsonResponse';
import { Book } from 'src/model/book.schema';

@Injectable()
export class LocationService {
  constructor(
    @InjectModel(Location.name) private locationModel: Model<Location>,
    @InjectModel(Book.name) private bookModel: Model<Book>,
  ) {}

  async create(
    createLocationDto: CreateLocationDto,
  ): Promise<JsonResponse<any>> {
    try {
      const { cabinet, shelve, drawer } = createLocationDto;
      const existingLocation = await this.locationModel.findOne({
        cabinet,
        shelve,
        drawer,
      });
      if (existingLocation) {
        throw new BadRequestException('This location is already is existed!');
      }

      const createdLocation = new this.locationModel(createLocationDto);
      const data = await createdLocation.save();
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

  async getAllLocation(): Promise<JsonResponse<any>> {
    try {
      const locations = await this.locationModel.find().exec();
      if (locations) {
        return new JsonResponse(
          'Get all locations',
          HttpStatus.ACCEPTED,
          locations,
        );
      }
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async getLocationById(id: string): Promise<Location> {
    const location = await this.locationModel.findById(id).exec();
    if (!location) {
      throw new NotFoundException(`Location with ID ${id} not found`);
    }
    return location;
  }

  async updateLocation(
    id: string,
    updateLocationDto: UpdateLocationDto,
  ): Promise<Location> {
    const updatedLocation = await this.locationModel
      .findByIdAndUpdate(id, updateLocationDto, { new: true })
      .exec();
    if (!updatedLocation) {
      throw new NotFoundException(`Location with ID ${id} not found`);
    }
    return updatedLocation;
  }

  async deleteLocation(id: string): Promise<JsonResponse<any>> {
    try {
      const locationId = new Types.ObjectId(id);

      const deleteBooksResult = await this.bookModel
        .deleteMany({ location: locationId })
        .exec();

      if (deleteBooksResult.deletedCount === 0) {
        console.log(`No books were found with location ID ${id}`);
      }

      const result = await this.locationModel
        .deleteOne({ _id: locationId })
        .exec();
      if (result.deletedCount === 0) {
        throw new NotFoundException(`Location with ID ${id} not found`);
      }

      return new JsonResponse('Deleted successfully', HttpStatus.ACCEPTED, {
        deletedlocationCount: result.deletedCount,
        deletedBooksCount: deleteBooksResult.deletedCount,
      });
    } catch (error) {
      throw new BadRequestException(
        error.message || 'An error occurred while deleting the location',
      );
    }
  }
}
