import 'reflect-metadata'
import { DataSource } from "typeorm"
import {Pessoas1728652525491} from './migrations/1728652525491-pessoas';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    entities: [],
    migrations: [Pessoas1728652525491],
    subscribers: [],
    synchronize: true,
})

