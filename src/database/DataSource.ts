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
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  migrationsRun: true,
  synchronize: true,
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source inicializado!');
  })
  .catch((err) => {
    console.error('Erro de Data Source na inicializaçao', err);
  });
