import { Module } from "@nestjs/common";
import { AppController } from "./app/app.controller";
import { AppService } from "./app/app.service";
import "dotenv/config";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "./database/database.module";
import { ProdutosModule } from "./modules/produtos.module";
import { AvaliacoesModule } from "./modules/avaliacoes.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),
    DatabaseModule,
    ProdutosModule,
    AvaliacoesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
