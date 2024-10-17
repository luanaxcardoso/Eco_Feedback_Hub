import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { ProdutoSubscriber } from "./subscribers/produto-create.subscriber";
import { Avaliacoes1728788891637 } from "./migrations/1728788891637-avaliacoes";
import { Produtos1729175501485 } from "./migrations/1729175501485-produtos";
import { AvaliacaoSubscriber } from "./subscribers/avaliacao-create.subscriber";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  entities: [__dirname + "/../**/*.entity{.ts,.js}"],
  migrations: [Produtos1729175501485, Avaliacoes1728788891637],
  subscribers: [ProdutoSubscriber, AvaliacaoSubscriber],
  synchronize: false,
});
