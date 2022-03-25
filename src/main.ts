import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { join } from 'path';
import { startDatabaseActions } from "./database/create.database";
import { NestExpressApplication } from "@nestjs/platform-express";

export const PORT = 3000;

async function bootstrap() {
  startDatabaseActions();

  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }));

  await app.listen(PORT);
}

bootstrap();

// npm install class-validator
// npm install class-transformer
// strip unneccessary parameters from DTO when using @Post