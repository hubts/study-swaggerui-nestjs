"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true
    }));
    const options = new swagger_1.DocumentBuilder()
        .setTitle(`사랑스러운 고양이 API Swagger`)
        .setDescription(`귀여운 고양이 데이터를 테크니컬하게 다룰 수 있는 API`)
        .setVersion(`1.0`)
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup(`api`, app, document);
    await app.listen(3000);
    const logger = new common_1.Logger(bootstrap.name);
    const url = await app.getUrl();
    logger.log(`Application is running on: ${url}`);
    logger.log(`Swagger is running on: ${url}/api`);
}
bootstrap();
//# sourceMappingURL=main.js.map