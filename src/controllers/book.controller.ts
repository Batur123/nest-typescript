import { Controller, Get, Param } from "@nestjs/common";
import { BooksService } from "../services/book.service";

@Controller('books')
export class BookController {
  constructor(private bookClass: BooksService) {}

  @Get()
  getAll() : any {
    return this.bookClass.getAllBooks();
  }

  @Get(':id')
  getOneById(@Param() params) : any {
    return this.bookClass.getBookById(params.id)
  }
}
