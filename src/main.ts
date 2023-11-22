import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    exposedHeaders: 'Access-Control-Allow-Origin',
  });
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('TEST')
    .setDescription('NEWS API with JWT')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  await app.listen(process.env['PORT']);
  console.log('SERVER STARTED on PORT: ', process.env['PORT']);
}
bootstrap();
