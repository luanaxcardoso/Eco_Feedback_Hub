import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app/app.controller";
import { AppService } from "./app/app.service";
import { ProdutosModule } from "./modules/produtos.module";
import { AvaliacoesModule } from "./modules/avaliacoes.module";
import { ConfigModule, ConfigService } from "@nestjs/config";


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>({
        type: "postgres",
      host: "localhost",
      port: 5432,
      database: "ecofeedbackhub",
      username: "postgres",
      password: "postgres",
      entities: [__dirname + '/src/domain/entities/*{.ts,.js}'], 
      migrations: [__dirname + '/database/migrations/*{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: false,
      })
      
    }),
    ProdutosModule,
    AvaliacoesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
