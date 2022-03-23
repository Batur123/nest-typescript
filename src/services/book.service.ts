import { Injectable } from "@nestjs/common";
import { db } from "../database/create.database";

@Injectable()
export class BooksService {
  getAllBooks() : any {
    return db
      .prepare("SELECT * FROM books")
      .all();
  }

  getBookById(book_id) : any {
    let result = db
      .prepare("SELECT * FROM books WHERE rowid = ?")
      .get(book_id);

    if(result !== undefined) {
      return result;
    }

    return {error: "Book not found."};
  }

  createNewBook(bookDto) : boolean {
    let result = db
      .prepare("INSERT INTO books (book_name, book_author, page_number, publish_date) VALUES (?,?,?,?)")
      .run(bookDto.book_name,bookDto.book_author,bookDto.page_number,bookDto.publish_date);

    return result.changes === 1;
  }

  deleteBookById(book_id) : boolean {
    let result = db
      .prepare("DELETE FROM books WHERE rowid = ?")
      .run(book_id);

    return result.changes;
  }
}