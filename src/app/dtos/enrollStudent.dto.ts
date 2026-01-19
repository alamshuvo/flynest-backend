import {
    IsNotEmpty,
    IsString,
    IsUUID,
  
  } from "class-validator";
  
  export class EnrollStudentDto {
    @IsString({ message: "Student id must be string value" })
    @IsNotEmpty()
    @IsUUID()
    student_id!: string;

  }
  