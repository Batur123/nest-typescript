import { Body, Controller, Get, Param, ParseIntPipe, Post } from "@nestjs/common";
import { BooksService } from "../services/book.service";
import { CreateBookDto } from "../dto/dtos";

@Controller('books')
export class BookController {
  constructor(private bookClass: BooksService) {
  }

  @Get()
  getAll(): any {
    return this.bookClass.getAllBooks();
  }

  @Get(':id')
  getOneById(@Param('id',ParseIntPipe) id: number): any {
    return this.bookClass.getBookById(id)
  }

  @Post()
  createBook(@Body() createBookDto: CreateBookDto) {
    return this.bookClass.createNewBook(createBookDto) ? "New book created." : 'Error';
  }
}
