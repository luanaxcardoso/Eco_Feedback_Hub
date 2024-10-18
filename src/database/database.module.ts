import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProdutoSubscriber } from "./subscribers/produto-create.subscriber";
import { AvaliacaoSubscriber } from "./subscribers/avaliacao-create.subscriber";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true, 
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: "postgres",
        host: "localhost", 
        port: 5432, 
        database: "ecofeedbackhub", 
        username: "postgres", 
        password: "postgres", 
        entities: [__dirname + "/../**/*.entity{.ts,.js}"],
        migrations: [__dirname + "/../migrations/*{.ts,.js}"],
        autoLoadEntities: true,
        subscribers: [ProdutoSubscriber, AvaliacaoSubscriber],
        synchronize: false,
      }),
    }),
  ],
})
export class DatabaseModule {}
