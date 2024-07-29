import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Location } from 'src/model/location.schema';

@Injectable()
export class LocationService {
    constructor(@InjectModel(Location.name) private locationModel: Model<Location>) { }

    async create(createLocationDto: CreateLocationDto): Promise<Location> {
        const createdLocation = new this.locationModel(createLocationDto);
        return createdLocation.save();
    }

    async getAllLocation(): Promise<Location[]> {
        return this.locationModel.find().exec();
    }

    async getLocationById(id: string): Promise<Location> {
        const location = await this.locationModel.findById(id).exec();
        if (!location) {
            throw new NotFoundException(`Location with ID ${id} not found`);
        }
        return location;
    }

    async updateLocation(id: string, updateLocationDto: UpdateLocationDto): Promise<Location> {
        const updatedLocation = await this.locationModel.findByIdAndUpdate(id, updateLocationDto, { new: true }).exec();
        if (!updatedLocation) {
            throw new NotFoundException(`Location with ID ${id} not found`);
        }
        return updatedLocation;
    }

    async deleteLocation(id: string): Promise<{ deletedCount?: number }> {
        const result = await this.locationModel.deleteOne({ _id: id }).exec();
        if (result.deletedCount === 0) {
            throw new NotFoundException(`Location with ID ${id} not found`);
        }
        return result;
    }
}
