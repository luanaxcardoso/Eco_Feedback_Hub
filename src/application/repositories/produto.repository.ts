import { Produto } from "src/domain/entities/produto.entity";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ProdutoRepository extends Repository<Produto> {
  
  async findById(id: number): Promise<Produto | null> {
    return this.findOne({ where: { id } }); 
  }

  
  async createProduto(createProdutoDto: Partial<Produto>): Promise<Produto> {
    const produto = this.create(createProdutoDto);
    return this.save(produto);
  }

  
  async removeProduto(id: number): Promise<Produto> {
    const produto = await this.findById(id);
    if (!produto) {
      throw new Error(`Produto com ID ${id} não encontrado`);
    }
    return this.remove(produto);
  }
}
