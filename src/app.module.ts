import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { LoginController } from './login.controller';
import { AppService } from './services/app.service';
import { UsersService } from "./services/user.service";

@Module({
  imports: [],
  controllers: [AppController,LoginController],
  providers: [AppService,UsersService],
})
export class AppModule {}
