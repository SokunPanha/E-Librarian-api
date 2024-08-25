import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/authDto';
import * as bcrypt from 'bcrypt'; // Correct import

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async validateUser(authDto: AuthDto): Promise<any> {
    const {email, password} = await authDto
    const user = await this.userService.findUser(email);

    if (user && await bcrypt.compare(password, user.password)) { // Use bcrypt.compare
      const payload = { email: user.email, role: user.role , username: user.username};
      return {
        "message": "successfully",
        "status": 200,
        "accessToken": this.jwtService.sign(payload),
        "user": payload
      }
    } 
  }


}