import { Body, Controller, Get, Post, Req, Request } from "@nestjs/common";
import { UsersTableClass, LoginDto } from "./database/create.database";
import { AppService } from "./app.service";

@Controller('login')
export class LoginController {

  @Post()
  loginEvent(@Body() loginDto: LoginDto): string {
    console.log(loginDto);
    let userClass = new UsersTableClass();

    if(userClass.authenticateUser(loginDto)) {
      return "Username and password accepted.";
    }

    return "Wrong username or password.";
  }
}
