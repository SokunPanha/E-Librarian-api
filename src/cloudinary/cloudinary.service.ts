import { Injectable } from '@nestjs/common';
import * as streamifier from "streamifier"
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
@Injectable()
export class CloudinaryService {
    uploadFile(
        file: Express.Multer.File
    ): Promise<UploadApiErrorResponse | UploadApiResponse>{
        return  new Promise((resolve, reject)=>{
            const upload = v2.uploader.upload_stream((error, result)=> {
                if (error) reject(error)
                resolve(result)
            })
            streamifier.createReadStream(file.buffer).pipe(upload)
        })
    }
}
