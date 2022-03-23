import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { startDatabaseActions, booksTableClass, usersTableClass } from "./database/create.database";

@Controller()
export class LoginController {
  @Get()
  getLoginPage(): string {
    return this.appService.getHello();
  }
}
