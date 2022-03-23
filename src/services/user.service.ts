import { Injectable } from "@nestjs/common";
import { db } from "../database/create.database";

@Injectable()
export class UsersService {
  getAllUsers(): any {
    return db.prepare("SELECT * FROM users").all();
  }

  authenticateUser(loginDto): boolean {
    return db
      .prepare("SELECT * FROM users WHERE username = ? AND password = ?")
      .get(loginDto.username, loginDto.password) !== undefined;
  }

  getUserById(user_id): any {
    return db
      .prepare("SELECT * FROM users WHERE rowid = ?")
      .get(user_id);
  }

  deleteUserById(user_id): boolean {
    let result = db
      .prepare("DELETE FROM users WHERE rowid = ?")
      .run(user_id);

    return result.changes;
  }
}