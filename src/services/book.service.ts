import { Injectable } from "@nestjs/common";
import { db } from "../database/create.database";

@Injectable()
export class BooksService {
  getAllBooks(sortBy?: string): any {
    let querySQL = "SELECT rowid,book_name,book_author,page_number,DATETIME(ROUND(publish_date) / 1000, 'unixepoch') AS publish_date FROM books";

    if (sortBy !== undefined) {
      switch (sortBy) {
        case 'book_author':
        case 'page_number':
        case 'book_name':
        case 'publish_date': {
          querySQL += " ORDER BY " + sortBy + " ASC";
          break;
        }

        case 'id': {
          querySQL += " ORDER BY rowid ASC";
          break;
        }
      }
    }

    return db.prepare(querySQL).all();
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

    return result ? result : { status: 404, error: "Book not found." };
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