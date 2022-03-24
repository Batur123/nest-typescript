import {
  IsDate,
  IsDefined,
  IsEmpty,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min
} from "class-validator";
import { Transform, Type } from "class-transformer";

export class LoginDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}

export class CreateBookDto {
  @IsNotEmpty({
    message: '\'book_name\' parameter can\'t be empty.', //Custom Message for Validator
  })
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

export class UpdateBookDto {
  @IsOptional()
  readonly book_name: string;
  @IsOptional()
  readonly book_author: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(0)
  @Max(2147483647)
  readonly page_number: number;

  @IsOptional()
  readonly publish_date: string;
}