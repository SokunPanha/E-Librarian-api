import { Module, OnModuleInit, Logger } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { configDotenv } from 'dotenv';
import { AuthModule } from './auth/auth.module';
configDotenv()
@Module({
  imports: [
MongooseModule.forRoot(process.env.DB_URI),
UserModule,
AuthModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule  {
}