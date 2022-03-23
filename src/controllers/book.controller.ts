import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { BooksService } from "../services/book.service";
import { CreateBookDto } from "../dto/dtos";

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

  @Post()
  createBook(@Body() createBookDto: CreateBookDto) {

    if(this.bookClass.createNewBook(createBookDto)) {
      return 'New book created.';
    }

    return 'Error';
  }
}
