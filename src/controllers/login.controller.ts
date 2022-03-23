import { Body, Controller, Post } from "@nestjs/common";
import { LoginDto } from "../database/create.database";
import { UsersService } from "../services/user.service";

@Controller('login')
export class LoginController {
  constructor(private userClass: UsersService) {}

  @Post()
  loginEvent(@Body() loginDto: LoginDto): string {
    console.log(loginDto);

    if(this.userClass.authenticateUser(loginDto)) {
      // redirect to home page
      return "Username and password accepted.";
    }

    // redirect to login page
    return "Wrong username or password.";
  }
}
