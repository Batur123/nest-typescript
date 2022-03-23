import { Controller, Get } from '@nestjs/common';
import { AppService } from './services/app.service';

// Root Page (index)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getRoot(): string {
    return "xD";
  }
}
