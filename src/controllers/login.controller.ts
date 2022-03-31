import { Body, Controller, Post, Res, UnauthorizedException } from "@nestjs/common";
import { LoginDto } from "../dto/dtos";
import { UsersService } from "../services/user.service";

export const loginRouteName = 'login';

@Controller(loginRouteName)
export class LoginController {
  constructor(private userClass: UsersService) {}

  @Post()
  loginEvent(@Body() loginDto: LoginDto,@Res() response): string {
    if(this.userClass.authenticateUser(loginDto)) {
      response.redirect('/books');
    }

    return "Wrong username or password.";
    //throw new UnauthorizedException();
  }
}
