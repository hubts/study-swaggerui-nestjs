import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { CatsService } from "./cats.service";
import { CreateCatDto } from "./dto/create-cat.dto";
import { CreateCatErrorDto } from "./dto/create-cat.error.dto";
import { Cat } from "./entities/cat.entity";

@ApiBearerAuth()
@ApiTags("고양이 API")
@Controller("cats")
export class CatsController {
  constructor(private readonly catsService: CatsService) { }

  @Post()
  @ApiOperation({ summary: "새로운 고양이를 들여오자!" })
  @ApiResponse({ status: 201, description: "새롭게 Cat 입양!", type: Cat })
  @ApiResponse({ status: 400, description: "Error: Bad Request", type: CreateCatErrorDto })
  async create(@Body() createCatDto: CreateCatDto): Promise<Cat> {
    return this.catsService.create(createCatDto);
  }

  @Get(":id")
  @ApiOperation({ summary: "고양이를 찾아보자!" })
  @ApiResponse({
    status: 200,
    description: "원하는 고양이를 찾았다!",
    type: Cat,
  })
  @ApiParam({
    name: "id",
    description: "원하는 고양이를 찾을 번호 (입양 후 조회할 것)",
    schema: {
      oneOf: [
        { type: "string" },
        { type: "number" }
      ]
    },
    // type: "string",
    example: 1
  })
  findOne(@Param("id") id: string | number): Cat {
    return this.catsService.findOne(+id);
  }
}
