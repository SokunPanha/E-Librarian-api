import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from './cloudinary.service';

@Controller('image')
export class CloudinaryController {

    constructor(private cloudinary: CloudinaryService){}
    @Post()
   async  uploadImage(@Body() images: any){
    const {image} = images
    const buffer = Buffer.from(image, 'base64');

    const file: Express.Multer.File = {
        buffer,
        size: buffer.length,
        originalname: 'image.jpg',
        mimetype: 'image/jpeg',
        fieldname: 'file',
        encoding: '7bit',
        destination: '',
        filename: '',
        path: '',
        stream: undefined
    };
    try {
        const result = await this.cloudinary.uploadFile(file);
        return result;
    } catch (error) {
        return {
            statusCode: 500,
            message: 'File upload failed',
            error: error.message,
        };
    }
}
}
