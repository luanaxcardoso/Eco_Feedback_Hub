import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import * as dotenv from "dotenv";
import { ProdutoSubscriber } from "./subscribers/produto-create.subscriber";
import { AvaliacaoSubscriber } from "./subscribers/avaliacao-create.subscriber";

dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get<string>("DB_HOST"),
        port: configService.get<number>("DB_PORT"),
        database: configService.get<string>("DB_NAME"),
        username: configService.get<string>("DB_USERNAME"),
        password: configService.get<string>("DB_PASSWORD"),
        entities: [__dirname + "/../**/*.entity{.ts,.js}"],
        migrations: [__dirname + "/../migrations/*{.ts,.js}"],
        autoLoadEntities: true,
        subscribers: [ProdutoSubscriber, AvaliacaoSubscriber],
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
