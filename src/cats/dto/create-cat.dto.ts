import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class CreateCatDto {
  @IsString()
  @ApiProperty({
    example: `네오`,
    description: `새로운 고양이의 이름을 지어주자`
  })
  readonly name: string;

  @IsInt()
  @ApiProperty({
    example: 3,
    description: `새로운 고양이의 나이를 입력하자`
  })
  readonly age: number;

  @IsString()
  @ApiProperty({
    example: `페르시안`,
    description: `새로운 고양이의 품종을 입력하자`
  })
  readonly breed: string;
}
