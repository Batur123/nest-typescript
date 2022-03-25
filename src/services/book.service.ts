import { Injectable } from "@nestjs/common";
import { db } from "../database/create.database";
import moment from "moment";

@Injectable()
export class BooksService {
  getAllBooks(sortBy?: string): any {
    let querySQL = "SELECT rowid,* FROM books";

    if (sortBy !== undefined) {
      switch (sortBy) {
        case 'book_author':
        case 'page_number':
        case 'book_name': {
          querySQL += " ORDER BY " + sortBy + " ASC";
          break;
        }

        case 'id': {
          querySQL += " ORDER BY rowid ASC";
          break;
        }
      }
    }

    let result = db
      .prepare(querySQL)
      .all();

    Object.keys(result).forEach(key => {
      result[key].publish_date = moment.unix(result[key].publish_date/1000).format("DD-MM-YYYY HH:mm:ss")
    });

    return result;
  }

  createNewBook(bookDto): boolean {
    let result = db
      .prepare("INSERT INTO books (book_name, book_author, page_number, publish_date) VALUES (?,?,?,?)")
      .run(bookDto.book_name, bookDto.book_author, bookDto.page_number, bookDto.publish_date);

    return result.changes === 1;
  }

  getBookById(book_id: number): any {
    let result = db
      .prepare("SELECT * FROM books WHERE rowid = ?")
      .get(book_id);

    if (result !== undefined) {
      return result;
    }

    return { error: "Book not found." };
  }

  updateBookById(book_id: number, booksDto: object): object {

    if (Object.keys(booksDto).length === 0) {
      return { status: 404, error: `Parameters are empty.` };
    }

    let selectBook = db
      .prepare("SELECT * FROM books WHERE rowid = ?").get(book_id);

    if (selectBook === undefined) {
      return { status: 404, error: `There is no book with ${book_id} id number.` };
    }

    let dynamicQuery = "UPDATE books SET ";

    for (let booksDtoKey in booksDto) {
      dynamicQuery += `${booksDtoKey}=@${booksDtoKey},`;
    }

    dynamicQuery = dynamicQuery.slice(0, -1) + " WHERE rowid=@rowid";
    Object.assign(booksDto, { 'rowid': book_id });

    db.prepare(dynamicQuery).run(booksDto);

    return { status: 200, message: `Book number ${book_id} has been updated.` };
  }

  deleteBookById(book_id: number): boolean {
    let result = db
      .prepare("DELETE FROM books WHERE rowid = ?")
      .run(book_id);

    return result.changes === 1;
  }
}