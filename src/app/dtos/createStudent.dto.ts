import {
    IsNotEmpty,
    IsNumber,
    IsString,
    MinLength,
  
  } from "class-validator";
  
  export class CreateStudentDto {
    @IsString({ message: "Student name be string value" })
    @MinLength(3)
    @IsNotEmpty()
    name!: string;

    @IsNumber()
    @IsNotEmpty()
    age!:number;

  }
  