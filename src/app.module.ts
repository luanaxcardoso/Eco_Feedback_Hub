import { Module } from '@nestjs/common';
import { AppController } from './app/app.controller';
import { AppService } from './app/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto } from './entities/produto.entity'; 
import { Avaliacao } from './entities/avaliacao.entity'; 
import { ProdutoSubscriber } from './subscribers/produto-create.subscriber';
import { AvaliacaoSubscriber } from './subscribers/avaliacao-create.subscriber';
import { ProdutosModule } from './modules/produtos.module';
import { AvaliacoesModule } from './modules/avaliacoes.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', 
      port: 5432, 
      username: 'postgres', 
      password: 'postgres', 
      database: 'ecofeedbackhub', 
      entities: [Produto, Avaliacao], 
      subscribers: [ProdutoSubscriber, AvaliacaoSubscriber], 
      synchronize: true, 
    }),
    ProdutosModule,
    AvaliacoesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

