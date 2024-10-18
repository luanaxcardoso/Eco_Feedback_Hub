iimport { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto } from './entities/produto.entity'; // exemplo de entidade
import { Avaliacao } from './entities/avaliacao.entity'; // exemplo de entidade
import { ProdutoSubscriber } from './subscribers/produto-create.subscriber';
import { AvaliacaoSubscriber } from './subscribers/avaliacao-create.subscriber';

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
  ],
})
export class DatabaseModule {}

