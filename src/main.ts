import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true
  }));

  const options = new DocumentBuilder()
    .setTitle(`사랑스러운 고양이 API Swagger`)
    .setDescription(`귀여운 고양이 데이터를 테크니컬하게 다룰 수 있는 API`)
    .setVersion(`1.0`)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(`api`, app, document);

  await app.listen(3000);
  
  const logger = new Logger(bootstrap.name);
  const url = await app.getUrl();
  logger.log(`Application is running on: ${url}`);
  logger.log(`Swagger is running on: ${url}/api`);
}
bootstrap();
