import "reflect-metadata";
import { DataSource } from "typeorm";
import { Produto } from "src/domain/entities/produto.entity";
import { Avaliacao } from "src/domain/entities/avaliacoes.entity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost", 
  port: 5432, 
  database: "ecofeedbackhub", 
  username: "postgres", 
  password: "postgres", 
  entities: [Produto, Avaliacao],
  synchronize: true,
});
