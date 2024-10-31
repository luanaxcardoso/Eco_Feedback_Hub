import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app/app.controller";
import { AppService } from "./app/app.service";
import { ProdutosModule } from "./modules/produtos.module";
import { AvaliacoesModule } from "./modules/avaliacoes.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import 'dotenv/config';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      entities: [__dirname + '/src/domain/entities/*{.ts,.js}'], 
      migrations: [__dirname + '/database/migrations/*{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true,
      })
      
    }),
    ProdutosModule,
    AvaliacoesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
