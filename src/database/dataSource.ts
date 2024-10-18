import "reflect-metadata";
import { DataSource } from "typeorm";
import { ProdutoSubscriber } from "./subscribers/produto-create.subscriber";
import { AvaliacaoSubscriber } from "./subscribers/avaliacao-create.subscriber";



export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost", 
  port: 5432, 
  database: "ecofeedbackhub", 
  username: "postgres", 
  password: "postgres", 
  entities: [__dirname + "/../**/*.entity{.ts,.js}"],
  migrations: [__dirname + "/../migrations/*{.ts,.js}"],
  subscribers: [ProdutoSubscriber, AvaliacaoSubscriber],
  synchronize: false,
});
