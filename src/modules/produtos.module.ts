import { Module } from "@nestjs/common";
import { ProdutosService } from "../application/services/produtos.service";
import { ProdutosController } from "../infra/controllers/produtos.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Produto } from "../domain/entities/produto.entity";
import { ProdutoRepository } from "src/application/repositories/produto.repository";

@Module({
  imports: [TypeOrmModule.forFeature([Produto])],
  controllers: [ProdutosController],
  providers: [ProdutosService, ProdutoRepository],
  exports: [ProdutosService],
})
export class ProdutosModule {}
