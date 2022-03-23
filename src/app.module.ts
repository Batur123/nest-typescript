import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { LoginController } from './login.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController,LoginController],
  providers: [AppService],
})
export class AppModule {}
