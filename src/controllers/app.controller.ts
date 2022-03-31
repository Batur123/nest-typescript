import { Controller, Get, Post, Render } from "@nestjs/common";
import { UsersService } from "../services/user.service";

export const rootRouteName = 'index';

@Controller()
export class AppController {
  constructor(private readonly usersService: UsersService) {
  }

  @Get()
  @Render(rootRouteName)
  getRoot(): any {}

}
