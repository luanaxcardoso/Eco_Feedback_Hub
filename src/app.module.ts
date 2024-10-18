import { Module } from "@nestjs/common";
import { AppController } from "./app/app.controller";
import { AppService } from "./app/app.service";
import { DatabaseModule } from "./database/database.module";
import { ProdutosModule } from "./modules/produtos.module";
import { AvaliacoesModule } from "./modules/avaliacoes.module";

@Module({
  imports: [
    DatabaseModule,
    ProdutosModule,
    AvaliacoesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
