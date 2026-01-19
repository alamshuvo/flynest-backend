import {
  IsNotEmpty,
  IsString,

} from "class-validator";

export class CreateClassDto {
  @IsString({ message: "Class Name should be string value" })
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  section!: string;
}
