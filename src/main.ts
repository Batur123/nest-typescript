import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { join } from 'path';
import { startDatabaseActions, BooksTableClass } from "./database/create.database";
import { NestExpressApplication } from "@nestjs/platform-express";

async function bootstrap() {
  startDatabaseActions();
  let books = new BooksTableClass();
  console.log(books.getAllBooks());
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  // npm install class-validator
  // npm install class-transformer
  // strip unneccessary keys from DTO when using @Post
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }));
  await app.listen(3000);
}

bootstrap();
