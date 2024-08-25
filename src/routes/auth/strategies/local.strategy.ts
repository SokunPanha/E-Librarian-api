import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import {Strategy} from "passport-local"
import { AuthService } from "../auth.service";
import { AuthDto } from "../dto/authDto";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
constructor(private authService: AuthService){
    super()
}


   async  validate(authDto: AuthDto){
     console.log("test",authDto)
        const user  = await this.authService.validateUser(authDto)
        if(!user){
            throw new UnauthorizedException()
        }
        return user
        
    }

}

