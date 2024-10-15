import { forwardRef, Module } from "@nestjs/common";
import { AvaliacoesService } from "../application/services/avaliacoes.service";
import { AvaliacoesController } from "../infra/controllers/avaliacoes.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Avaliacao } from "../domain/entities/avaliacoes.entity";
import { ProdutosModule } from "src/modules/produtos.module";
import AvaliacaoRepository from "src/application/repositories/avaliacoes.repository";

@Module({
  imports: [
    TypeOrmModule.forFeature([Avaliacao]),
    forwardRef(() => ProdutosModule),
  ],
  controllers: [AvaliacoesController],
  providers: [AvaliacoesService, AvaliacaoRepository],
  exports: [AvaliacoesService],
})
export class AvaliacoesModule {}
