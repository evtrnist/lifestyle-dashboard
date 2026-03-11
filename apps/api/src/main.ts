import { writeFileSync } from 'fs';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { AppModule } from './app/app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;
  const globalPrefix = process.env.API_PREFIX || '';

  if (globalPrefix) {
    app.setGlobalPrefix(globalPrefix);
  }

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('LifeDashboard API')
    .setDescription('API для авторизации, работы с дашбордом и данными пользователей')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`${globalPrefix}/docs`, app, document);
  Logger.log('Swagger UI is available at: http://localhost:' + port + `/${globalPrefix}/docs`);

  if (process.env.NODE_ENV === 'development') {
    writeFileSync('./openapi.json', JSON.stringify(document, null, 2));
  }

  Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);

  await app.listen(port);
}

bootstrap();
