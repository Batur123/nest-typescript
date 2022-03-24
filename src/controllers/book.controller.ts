import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post, Req
} from "@nestjs/common";
import { BooksService } from "../services/book.service";
import { CreateBookDto } from "../dto/dtos";
import { Request } from 'express';
import { IsEmpty } from "class-validator";

@Controller('books')
export class BookController {
  constructor(private bookClass: BooksService) {
  }

  @Get()
  @HttpCode(200)
  getAll(@Req() request: Request) : string {
    return request.query?.sortBy === undefined ? this.bookClass.getAllBooks() : this.bookClass.getAllBooks(request.query.sortBy.toString());
  }
  
  @Get(':id')
  @HttpCode(200)
  getOneById(@Param('id', ParseIntPipe) id: number) {
    return this.bookClass.getBookById(id)
  }

  @Post()
  @HttpCode(201)
  createBook(@Body() createBookDto: CreateBookDto) {
    return this.bookClass.createNewBook(createBookDto) ? "New book created." : 'Error';
  }

  @Delete(':id')
  @HttpCode(200)
  deleteBookByID(@Param('id', ParseIntPipe) id: number) {
    if (this.bookClass.deleteBookById(id)) {
      return {
        status: 200,
        message: 'Book successfully deleted.'
      };
    } else {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'There is no book with ' + id + " id number.",
      }, HttpStatus.NOT_FOUND);
    }
  }
}
