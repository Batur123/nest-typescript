import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { startDatabaseActions,booksTableClass } from './database/create.database';

async function bootstrap() {
  startDatabaseActions();
  let books = new booksTableClass();
  console.log(books.getAllBooks());
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

bootstrap();
