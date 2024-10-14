import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const documentBuilderConfig = new DocumentBuilder()
    .setTitle('Eco Feedback Hub API')
    .setDescription('API para gerenciar produtos e avaliações de produtos veganos, vegetarianos, cruelty-free e sustentáveis')
    .setVersion('1.0')
    .addTag('Rotas da API')
    .build();

  const documento = SwaggerModule.createDocument(app, documentBuilderConfig);
  SwaggerModule.setup('swagger', app, documento);

  await app.listen(3000);

  console.log(`Aplicação está rodando em: http://localhost:${process.env.PORT || 3000}`);
  console.log(`Documentação da API está disponível em: http://localhost:${process.env.PORT || 3000}/swagger`);
}

bootstrap();
