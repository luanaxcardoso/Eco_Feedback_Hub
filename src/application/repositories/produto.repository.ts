import { Produto } from "src/domain/entities/produto.entity";
import { Repository } from "typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CategoriaProduto } from "src/domain/enum/categoria-produto.enum";

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
      throw new NotFoundException(`Produto com ID ${id} não encontrado`);
    }
    return this.remove(produto);
  }

  async findByCategoria(categoria: string): Promise<Produto[]> {
    const categoriaEnum = CategoriaProduto[categoria.toUpperCase() as keyof typeof CategoriaProduto];
  
    if (!categoriaEnum) {
      throw new NotFoundException("Categoria inválida");
    }
  
    const produtos = await this.find({
      where: { categoria: categoriaEnum }, 
    });
  
    if (produtos.length === 0) {
      throw new NotFoundException("Nenhum produto encontrado nesta categoria");
    }
  
    return produtos;
  }
  
}
