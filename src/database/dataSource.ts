import "reflect-metadata";
import { DataSource } from "typeorm";
import { ProdutoSubscriber } from "./subscribers/produto-create.subscriber";
import { AvaliacaoSubscriber } from "./subscribers/avaliacao-create.subscriber";
import { Produtos1729220170057 } from "./migrations/1729220170057-produtos";
import { Avaliacoes1729220182295 } from "./migrations/1729220182295-avaliacoes";



export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost", 
  port: 5432, 
  database: "ecofeedbackhub", 
  username: "postgres", 
  password: "postgres", 
  entities: [__dirname + "/../**/*.entity{.ts,.js}"],
  migrations: [Produtos1729220170057,Avaliacoes1729220182295],
  subscribers: [ProdutoSubscriber, AvaliacaoSubscriber],
  synchronize: true,
});
