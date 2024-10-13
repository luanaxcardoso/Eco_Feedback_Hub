import { Module } from "@nestjs/common";
import { ProdutosService } from "../application/services/produtos.service";
import { ProdutosController } from "../infra/produtos.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Produto } from "../domain/entities/produto.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Produto])],
  controllers: [ProdutosController],
  providers: [ProdutosService],
  exports: [ProdutosService], 
})
export class ProdutosModule {}
