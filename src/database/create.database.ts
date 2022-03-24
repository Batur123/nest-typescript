import Database from "better-sqlite3";
import { IsNotEmpty } from 'class-validator';

export const db = new Database('nestDatabase.db',{});

/*
function* toRows(stmt) {
  yield stmt.columns().map(column => column.name);
  yield* stmt.raw().iterate();
}
*/

function createBooksTable() {
  console.log("[Info]: Running createBooksTable function for debug test.");

  db.prepare('CREATE TABLE IF NOT EXISTS books (book_name TEXT, book_author TEXT, page_number INTEGER, publish_date INTEGER)')
    .run();

  const selectBooksTable = db.prepare("SELECT * FROM books").all();

  if (selectBooksTable.length === 0) {
    console.log("[Info]: \'books\' table created for the first time.");

    let date = Date.now();
    db.prepare("INSERT INTO books(book_name, book_author, page_number, publish_date) VALUES (?,?,?,?)")
      .run("1984", "George Orwell", "999", date);

    db.prepare("INSERT INTO books(book_name, book_author, page_number, publish_date) VALUES (?,?,?,?)")
      .run("Test 1", "111", "888", date);

    db.prepare("INSERT INTO books(book_name, book_author, page_number, publish_date) VALUES (?,?,?,?)")
      .run("Test 2", "222", "777", date);

    db.prepare("INSERT INTO books(book_name, book_author, page_number, publish_date) VALUES (?,?,?,?)")
      .run("Test 3", "333", "666", date);
  }
}

function createUsersTable() {
  db.prepare('CREATE TABLE IF NOT EXISTS users (username TEXT, password TEXT, email TEXT, register_date INTEGER)')
    .run();

  const selectUsers = db.prepare("SELECT * FROM users").all();

  if (selectUsers.length === 0) {
    console.log("[Info]: \'users\' table created for the first time.");

    let date = Date.now();
    db.prepare("INSERT INTO users(username,password,email,register_date) VALUES (?,?,?,?)")
      .run("admin", "admin", "admin@gmail.com", date);
  }
}

export function startDatabaseActions() {
  createBooksTable();
  createUsersTable();
  db.exec("VACUUM;");
}
