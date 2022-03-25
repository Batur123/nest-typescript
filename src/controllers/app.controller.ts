import { Controller, Get, Render } from "@nestjs/common";
import { BooksService } from "../services/book.service";

export const rootRouteName = 'index';

@Controller()
export class AppController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  @Render(rootRouteName)
  getRoot(): object {
    return {booksListJson: this.booksService.getAllBooks()};
  }
}
