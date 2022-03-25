import { Body, Controller, Post } from "@nestjs/common";
import { LoginDto } from "../dto/dtos";
import { UsersService } from "../services/user.service";

export const loginRouteName = 'login';

@Controller(loginRouteName)
export class LoginController {
  constructor(private userClass: UsersService) {}

  @Post()
  loginEvent(@Body() loginDto: LoginDto): string {
    console.log(loginDto);

    if(this.userClass.authenticateUser(loginDto)) {
      return "Username and password accepted.";
    }

    return "Wrong username or password.";
  }
}
