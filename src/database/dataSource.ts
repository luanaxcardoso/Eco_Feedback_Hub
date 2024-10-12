import 'reflect-metadata'
import { DataSource } from "typeorm"
import {Produtos1728693939291} from './migrations/1728693939291-produtos'
import * as dotenv from 'dotenv';
import { ProdutoSubscriber } from './subscribers/produto.subscriber';

dotenv.config();

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    migrations: [Produtos1728693939291],
    subscribers: [ProdutoSubscriber],
    synchronize: true,
})

