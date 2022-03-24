import { Injectable } from "@nestjs/common";
import { db } from "../database/create.database";

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

    if (result.length !== 0) {
      return result;
    }

    return { error: "Books are empty." };
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

  /*
  Experimental
  -> Prevent SQL Injections
  -> Dynamic Updating Fixes
 
   */
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
    let values = "";

    for (let booksDtoKey in booksDto) {
      dynamicQuery += `${booksDtoKey} = ?,`;
      values += booksDto[booksDtoKey]+",";
    }

    dynamicQuery = dynamicQuery.slice(0, -1) + " WHERE rowid = ?";
    values = values.slice(0,-1) + "," + book_id;

    console.log(values);
    console.log(dynamicQuery);

    let result = db
      .prepare(dynamicQuery).run(...values)

    return result.changes === 1 ? { status: 200, error: `Book number ${book_id} has been updated.` } : { status: 404, error: `Update failed.` }
  }

  deleteBookById(book_id: number): boolean {
    let result = db
      .prepare("DELETE FROM books WHERE rowid = ?")
      .run(book_id);

    return result.changes === 1;
  }
}