import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNumber, IsString } from "class-validator";

export class CreateCatErrorDto {
  @ApiProperty({
    example: 400
  })
  @IsNumber()
  statusCode: number;

  @ApiProperty({
    example: [
      "name must be a string",
      "age must be an integer number",
      "breed must be a string"
    ]
  })
  @IsArray()
  message: string[];

  @ApiProperty({
    example: "Bad Request"
  })
  @IsString()
  error: string;
}