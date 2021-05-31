import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class Cat {
  @IsString()
  @ApiProperty({
    example: `네오`,
    description: `우리 고양이의 귀여운 이름`
  })
  name: string;

  @IsNumber()
  @ApiProperty({
    example: 3,
    description: `우리 고양이의 귀여운 나이`
  })
  age: number;

  @IsString()
  @ApiProperty({
    example: `페르시안`,
    description: `breed가 뭐종? 바로바로 고양이종 ㅋㅋ`,
  })
  breed: string;
}
