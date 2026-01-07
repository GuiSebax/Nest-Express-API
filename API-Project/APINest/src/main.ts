import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove campos extras
      forbidNonWhitelisted: true, // erro se mandar campo que não existe no DTO
      transform: true, // transforma tipos (string -> number etc)
    })
  )
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
