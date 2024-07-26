import { Module, OnModuleInit, Logger } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';
import { UserModule } from './routes/user/user.module';
import { configDotenv } from 'dotenv';
import { AuthModule } from './routes/auth/auth.module';
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