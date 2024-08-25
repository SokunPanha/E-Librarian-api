import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
  Get,
  Req
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AuthDto } from './dto/authDto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  // @UseGuards(AuthGuard("local"))
  signIn(@Body() authDto: AuthDto) {
    return this.authService.validateUser(authDto)
  }

  @Get('profile')
  getProfile(@Req() request: Request) {
    return request['user'];
  }
}
