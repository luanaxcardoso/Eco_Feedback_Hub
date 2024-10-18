import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProdutoSubscriber } from "./subscribers/produto-create.subscriber";
import { AvaliacaoSubscriber } from "./subscribers/avaliacao-create.subscriber";
import { Avaliacoes1729220182295 } from "./migrations/1729220182295-avaliacoes";
import { Produtos1729220170057 } from "./migrations/1729220170057-produtos";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      database: "ecofeedbackhub",
      username: "postgres",
      password: "postgres",
      entities: [__dirname + "/../**/*.entity{.ts,.js}"],
      migrations: [Avaliacoes1729220182295, Produtos1729220170057],
      autoLoadEntities: true,
      subscribers: [ProdutoSubscriber, AvaliacaoSubscriber],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
