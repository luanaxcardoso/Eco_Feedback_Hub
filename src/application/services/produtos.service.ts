import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateProdutoDto } from "../dtos/create-produto.dto";
import { UpdateProdutoDto } from "../dtos/update-produto.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Produto } from "../../domain/entities/produto.entity";
import { Repository } from "typeorm";
import { CategoriaProduto } from '../../domain/enum/categoria-produto.enum';

@Injectable()
export class ProdutosService {
  constructor(
    @InjectRepository(Produto)
    private readonly produtoRepository: Repository<Produto>
  ) {}


  async create(createProdutoDto: CreateProdutoDto) {
    const produtoNovo = this.produtoRepository.create(createProdutoDto);
    const produtoSalvo = await this.produtoRepository.save(produtoNovo);

    
    return {
      id: produtoSalvo.id,
      ...produtoSalvo,
    };
  }


  async findAll() {
    const produtos = await this.produtoRepository.find({
      order: {
        id: "ASC",
      },
    });
    return produtos;
  }


  async findOne(id: number) {
    const produto = await this.produtoRepository.findOneBy({
      id,
    });
    if (!produto) {
      throw new NotFoundException("Produto não encontrado");
    }
    return produto;
  }

  
  async findOneByCategoria(categoria: string) {
    const categoriaEnum = CategoriaProduto[categoria.toUpperCase() as keyof typeof CategoriaProduto];

    if (!categoriaEnum) {
      throw new NotFoundException("Categoria inválida");
    }
  
    const produtos = await this.produtoRepository.find({
      where: {
        categoria: categoriaEnum,
      },
    });
  
    if (produtos.length === 0) {
      throw new NotFoundException("Nenhum produto encontrado");
    }
  
    return produtos;
  }
  

  async update(id: number, updateProdutoDto: UpdateProdutoDto) {
    const produtoDto = {
      nome: updateProdutoDto.nome,
      marca: updateProdutoDto.marca,
      preco: updateProdutoDto.preco,
      quantidade: updateProdutoDto.quantidade,
      categoria: updateProdutoDto.categoria, 
    };
  
    const produto = await this.produtoRepository.preload({
      id,
      ...produtoDto,
    });
    
    if (!produto) {
      throw new NotFoundException("Produto não encontrado");
    }
    
    return this.produtoRepository.save(produto);
  }
  

  async remove(id: number) {
    const produto = await this.produtoRepository.findOneBy({
      id,
    });
    if (!produto) {
      throw new NotFoundException("Produto não encontrado");
    }
    return this.produtoRepository.remove(produto);
  }
}