import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { join } from 'path';
import { startDatabaseActions } from "./database/create.database";
import { BooksService } from "./services/book.service";
import { NestExpressApplication } from "@nestjs/platform-express";

async function bootstrap() {
  startDatabaseActions();
  let books = new BooksService();
  console.log(books.getAllBooks());
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  // npm install class-validator
  // npm install class-transformer
  // strip unneccessary parameters from DTO when using @Post
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }));
  await app.listen(3000);
}

bootstrap();
