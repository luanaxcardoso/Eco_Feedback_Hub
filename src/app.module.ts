import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app/app.controller";
import { AppService } from "./app/app.service";
import { ProdutosModule } from "./modules/produtos.module";
import { AvaliacoesModule } from "./modules/avaliacoes.module";
import { Produto } from "./domain/entities/produto.entity";
import { Avaliacao } from "./domain/entities/avaliacoes.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      database: "ecofeedbackhub",
      username: "postgres",
      password: "postgres",
      entities: [Produto, Avaliacao], 
      autoLoadEntities: true,
      synchronize: true,
    }),
    ProdutosModule,
    AvaliacoesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
