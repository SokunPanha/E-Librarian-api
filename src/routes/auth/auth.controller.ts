import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto, LoginUserDto } from './dto/create-auth.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  register(@Body() createAuthDto: RegisterUserDto) {
    return this.authService.register(createAuthDto);
  }
  
  @Post("login")
  login(@Body() loginUserDto: LoginUserDto){
    return this.authService.login(loginUserDto);
  }

}
