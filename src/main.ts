import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ErrorInterceptor } from './infra/interceptors/error.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalInterceptors(new ErrorInterceptor());

  const documentBuilderConfig = new DocumentBuilder()
    .setTitle('Eco Feedback Hub API')
    .setDescription('API para gerenciar avaliações de produtos veganos, vegetarianos e sustentáveis')
    .setVersion('1.0')
    .addTag('Rotas da API')
    .build();

  const documento = SwaggerModule.createDocument(app, documentBuilderConfig);
  SwaggerModule.setup('swagger', app, documento);

  const PORT = 3000; 

  await app.listen(PORT);

  console.log(`Aplicação está rodando em: http://localhost:${PORT}`);
  console.log(`Documentação da API está disponível em: http://localhost:${PORT}/swagger`);
}

bootstrap();
