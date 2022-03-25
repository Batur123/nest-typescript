import { Controller, Get, Render } from "@nestjs/common";
import { BooksService } from "../services/book.service";

export const rootRouteName = 'index';

@Controller()
export class AppController {
  constructor(private readonly booksService: BooksService) {
  }

  @Get()
  @Render(rootRouteName)
  getRoot(): object {
    let booksList = this.booksService.getAllBooks();
    let isEmpty = booksList.length === 0;
    return { booksListJson: booksList, isBooksEmpty: isEmpty };
  }
}
