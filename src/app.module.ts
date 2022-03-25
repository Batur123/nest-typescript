import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { BookMiddleware } from "./middleware/book.middleware";
import { UserMiddleware } from "./middleware/user.middleware";
import { AppController } from "./controllers/app.controller";
import { LoginController, loginRouteName } from "./controllers/login.controller";
import { BookController, booksRouteName } from "./controllers/book.controller";
import { AppService } from "./services/app.service";
import { UsersService } from "./services/user.service";
import { BooksService } from "./services/book.service";

@Module({
  imports: [],
  controllers: [AppController,LoginController,BookController],
  providers: [AppService,UsersService,BooksService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(BookMiddleware)
      .forRoutes(booksRouteName);

    consumer
      .apply(UserMiddleware)
      .forRoutes({ path: loginRouteName, method: RequestMethod.POST });
  }
}
