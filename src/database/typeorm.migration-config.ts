import "reflect-metadata";
import { DataSource } from "typeorm";
import { Produto } from "src/domain/entities/produto.entity";
import { Avaliacao } from "src/domain/entities/avaliacoes.entity";
import 'dotenv/config';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
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
