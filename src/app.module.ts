import { Module, OnModuleInit, Logger } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { InjectConnection } from '@nestjs/mongoose';
import { configDotenv } from 'dotenv';


configDotenv()
@Module({
  imports: [

MongooseModule.forRoot(process.env.DB_URI),
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule  {

}