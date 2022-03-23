import { IsDate, IsInt, IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";
import { Transform, Type } from "class-transformer";
import moment from "moment";

export class LoginDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}

export class CreateBookDto {
  @IsNotEmpty()
  readonly book_name: string;

  @IsNotEmpty()
  readonly book_author: string;

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  @Min(0)
  @Max(2147483647)
  readonly page_number: number;

  @IsNotEmpty()
  readonly publish_date: string;
}