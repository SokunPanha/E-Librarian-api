import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Location } from 'src/model/location.schema';

@Injectable()
export class LocationService {
    constructor(@InjectModel(Location.name) private locationModel: Model<Location>) { }

    create(createLocationDto: CreateLocationDto) {
        const createdLocation = new this.locationModel(createLocationDto);
        return createdLocation.save();
    }

    getAllLocation() {
        return 'Get all locations';
    }

    getLocationById(id: string) {
        return `Get location by id: ${id}`;
    }

    updateLocation(id: string, updateLocationDto: UpdateLocationDto) {
        return `Update location: ${id} sucessfullly`;
    }

    deleteLocation(id: string) {
        return `Delete location: ${id} sucessfullly`;
    }
}
