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
configDotenv()
@Module({
  imports: [
MongooseModule.forRoot(process.env.DB_URI),
UserModule,
AuthModule,
AuthorModule,
CategoryModule,
LocationModule
],
  controllers: [AppController, AuthorController, CategoryController, LocationController],
  providers: [AppService, AuthorService, CategoryService, LocationService],
})
export class AppModule implements OnModuleInit {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  async onModuleInit() {
    this.connection.on('connected', () => {
      Logger.log('MongoDB connection established successfully');
    });

    this.connection.on('error', (err) => {
      Logger.error('MongoDB connection error: ', err);
    });

    this.connection.on('disconnected', () => {
      Logger.warn('MongoDB connection disconnected');
    });
  }
}