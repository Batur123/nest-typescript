import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { LoginController } from './controllers/login.controller';
import { BookController } from './controllers/book.controller';
import { AppService } from './services/app.service';
import { UsersService } from "./services/user.service";
import { BooksService } from "./services/book.service";

@Module({
  imports: [],
  controllers: [AppController,LoginController,BookController],
  providers: [AppService,UsersService,BooksService],
})
export class AppModule {}
