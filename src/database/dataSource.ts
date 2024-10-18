import "reflect-metadata";
import { DataSource } from "typeorm";
import { ProdutoSubscriber } from "./subscribers/produto-create.subscriber";
import { Avaliacoes1728788891637 } from "./migrations/1728788891637-avaliacoes";
import { Produtos1729175501485 } from "./migrations/1729175501485-produtos";
import { AvaliacaoSubscriber } from "./subscribers/avaliacao-create.subscriber";


export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost", 
  port: 5432, 
  database: "ecofeedbackhub", 
  username: "seu_usuario", 
  password: "sua_senha", 
  entities: [__dirname + "/../**/*.entity{.ts,.js}"],
  migrations: [Produtos1729175501485, Avaliacoes1728788891637],
  subscribers: [ProdutoSubscriber, AvaliacaoSubscriber],
  synchronize: false,
});
