import { Module, OnModuleInit, Logger } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';
import { UserModule } from './routes/user/user.module';
import { configDotenv } from 'dotenv';
import { AuthModule } from './routes/auth/auth.module';
import { AuthorService } from './routes/author/author.service';
import { AuthorController } from './routes/author/author.controller';
import { AuthorModule } from './routes/author/author.module';
import { CategoryController } from './routes/category/category.controller';
import { CategoryModule } from './routes/category/category.module';
import { CategoryService } from './routes/category/category.service';
import { LocationModule } from './routes/location/location.module';
import { LocationController } from './routes/location/location.controller';
import { LocationService } from './routes/location/location.service';
import { BookModule } from './routes/book/book.module';
import { BookService } from './routes/book/book.service';
import { BookController } from './routes/book/book.controller';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './utilities/httpException.service';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
configDotenv()
@Module({
  imports: [

MongooseModule.forRoot(process.env.DB_URI),
UserModule,
AuthModule,
AuthorModule,
CategoryModule,
LocationModule,
BookModule,
CloudinaryModule
],
  controllers: [AppController, AuthorController, CategoryController, LocationController, BookController],
  providers: [AppService, AuthorService, CategoryService, LocationService, BookService, 
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter
    }
  ],
})
export class AppModule  {}