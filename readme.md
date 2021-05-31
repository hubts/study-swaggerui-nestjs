# NestJS에서 Swagger를 사용하기

## 문서 정보

| 항목          | 내용             |
| ------------- | ---------------- |
| 업데이트 날짜 | 2021년 05월 31일 |

## Swagger란?

[Swagger](https://swagger.io/)는 REST API의 이해도를 높여주는 Open Api Specification (OAS) 프레임워크입니다. 기존 API 서버에 Swagger에서 제공하는 간단한 코드들을 추가하면, 생성된 API 문서 사이트를 통해 REST API의 명세를 일목요연하게 살펴볼 수 있습니다. 특히, Swagger는 오픈소스 프로젝트이므로 무료로 이용할 수 있습니다.

웹 서비스 프로젝트를 수행할 때, 여러 개발자들이 프로젝트에 참여하게 될 수 있습니다. Web 및 Mobile은 주어진 API 서버와 연동하여 다양한 데이터를 처리하고 출력합니다. 이 때, 접근할 API 서버의 명세가 무엇인지 모른다면 프론트엔드 개발자와 백엔드 개발자는 원활한 커뮤니케이션을 수행할 수 없습니다.

__Swagger는 API 서버에 개발된 프로젝트에 대한 API 명세를 자동 생성해줍니다. 우리는 별도로 각 API의 명세를 정리하기 위해 문서화 작업을 수행하거나 API를 수정할 때마다 문서를 수정할 필요가 없습니다.__

> 본 문서에서는 NestJS 기반 API에 대한 Swagger를 적용하여 사용법에 대해 설명합니다. 따라서, 기본적인 [NestJS](https://docs.nestjs.com/first-steps) 프로젝트를 생성하고 다룰 수 있어야 합니다.

## 출처 사이트

- [Swagger OpenAPI Specification](https://swagger.io/specification/)
- [NestJS Official OpenAPI Swagger](https://docs.nestjs.com/openapi/introduction)

## 코드 시작하기

~~~bash
git clone https://github.com/hubts/study-swaggerui-nestjs.git
~~~

본 repository의 코드를 클론합니다.

~~~bash
npm install
~~~

`npm` 명령어를 이용하여 프로젝트에 관련된 dependency들을 자동 설치합니다.

특히, 다음과 같은 dependency들이 주요 역할을 가집니다:

~~~bash
@nestjs/swagger
class-validator
~~~

전자는 Swagger의 기능을 제공하며, 후자는 요청/응답하는 데이터의 폼을 결정하는 Pipe를 제공합니다.

다음 명령어를 통해 프로젝트를 실행합니다:

~~~bash
npm run start # start
npm run start:dev # start --watch (dev) 
~~~

프로젝트가 실행되었으면, 우리는 [http://localhost:3000/api](http://localhost:3000/api) 링크로 접속하여 활성화된 Swagger의 인터페이스인 API 명세 사이트를 마주할 수 있습니다.

## Swagger 사용하기

기본적인 NestJS 프로젝트에 Swagger를 연동하기 위해 작성된 코드들은 다음에 위치합니다.

~~~bash
/src/main.ts
/src/cats/cats.controller.ts
/src/cats/dto/*.dto.ts
/src/cats/entities/*.entity.ts
~~~

이제부터 해당 코드들에 Swagger 및 Validator가 제공하는 데코레이터(Decorator)를 확인합니다.

### main.ts

~~~typescript
// Pipe
app.useGlobalPipes(new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true
}));
~~~

`Pipe` 는 NestJS 어플리케이션에 대하여 요청되는 API 요청에 대한 파이프라인을 설정합니다. 직관적으로, 요청되는 데이터가 약속된 폼을 가지지 않는 경우, 모두 반려하는 기능을 수행합니다.

~~~typescript
const options = new DocumentBuilder()
  .setTitle(`사랑스러운 고양이 API Swagger`)
  .setDescription(`귀여운 고양이 데이터를 테크니컬하게 다룰 수 있는 API`)
  .setVersion(`1.0`)
  .addBearerAuth()
  .build();
const document = SwaggerModule.createDocument(app, options);
SwaggerModule.setup(`api`, app, document);
~~~

위 코드는 Swagger에서 import하여 작성된 코드입니다. 다음과 같은 옵션들이 동반되었습니다.

- `setTitle` : API 타이틀 (웹 사이트 타이틀)
- `setDescription` : 타이틀 하단의 설명
- `addBearerAuth` : Bearer Authorization를 구현하여 이용 가능
- `SwaggerModule.setup` : 생성된 API 문서 사이트 Route 주소

### cats.controller.ts

~~~typescript
@ApiBearerAuth()
@ApiTags('고양이 API')
@Controller('cats')
~~~

`@ApiTags` 로 현재 서비스의 API 이름을 붙여줍니다. `@Controller` 뒤에 존재하는 이름이 Swagger가 적용되는 서비스의 상위 Route 주소입니다.

#### @Post

~~~typescript
@Post()
@ApiOperation({ summary: '새로운 고양이를 들여오자!' })
@ApiResponse({ status: 201, description: '새롭게 Cat 입양!', type: Cat })
@ApiResponse({ status: 400, description: 'Error: Bad Request', type: CreateCatErrorDto})
async create(@Body() createCatDto: CreateCatDto): Promise<Cat> {
  return this.catsService.create(createCatDto);
}
~~~

- `@ApiOperation` : API 함수에 대한 간단한 설명
- `@ApiResponse` : API 함수 요청에 대한 응답 (요청에 대한 성공 혹은 실패)
  - `status` : 응답 HTTP 코드
  - `description` : 설명
  - `type` : 응답 데이터의 Form (String, Entity, Dto 등)
- `@Body` : 입력된 Dto에 의하여 Request body 설정 (이전 버전에서는 `@ApiBody` 이용)

#### @Get

~~~typescript
@Get(':id')
@ApiOperation( { summary: '고양이를 찾아보자!' } )
@ApiResponse({
  status: 200,
  description: '원하는 고양이를 찾았다!',
  type: Cat,
})
@ApiParam({
  name: 'id',
  description: '원하는 고양이를 찾을 번호 (입양 후 조회할 것)',
  type: "string",
  example: 1
})
findOne(@Param('id') id: string): Cat {
  return this.catsService.findOne(+id);
}
~~~

- `@ApiParam` : 입력되는 Parameters 설정
  - `name` : 입력되는 파라미터의 이름 (대상 함수의 `@Param()` 과 동일 값)
  - `example` : 파라미터의 예시가 될 수 있는 값 설정

### *.dto.ts

`*.dto.ts` 파일과 `*.entity.ts` 파일에서는 데이터 폼을 결정하고, 해당 데이터 폼에 대한 조건들을 제시하여, 직접적인 데이터 명세를 나타냅니다.

~~~typescript
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
~~~

- `@ApiProperty` : Entity 및 Dto의 각 필드 값들의 명세를 설정
- `@Is*` : Validator의 Pipe가 선별하는 각 필드 값의 Type 조건

## 마무리

이제 [http://localhost:3000/api](http://localhost:3000/api) 링크로 접속하여 Swagger가 올바르게 동작하는지 확인합니다. 

상단에서는 작성한 API에 대한 명세와 실제로 실행할 수 있는 Try it out 기능이 주어집니다. 코드에서 작성하여 주어진 `example` 값들을 이용하여, 실제 API 요청을 Execute 해볼 수 있습니다.

또한, API 요청에 대한 토큰 기반의 인증을 구현하였다면, Authorization에 대한 필수 기능을 추가할 수 있습니다. 각 API에 대한 토큰 필요 유무는 '자물쇠' 아이콘으로 구분할 수 있습니다.

마지막으로 하단의 Schemas 에서 각 Request 혹은 Response 에 대한 Entity 및 Dto의 명세를 확인할 수 있습니다. 해당 Schema들을 통해 API를 요청하고 응답 받을 수 있음이 명세화 되어 있습니다.