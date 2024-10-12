import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateProdutoDto } from "../dto/create-produto.dto";
import { UpdateProdutoDto } from "../dto/update-produto.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Produto } from "../../domain/entities/produto.entity";
import { Repository } from "typeorm";

@Injectable()
export class ProdutosService {
  constructor(
    @InjectRepository(Produto)
    private readonly produtoRepository: Repository<Produto>
  ) {}


  async create(createProdutoDto: CreateProdutoDto) {
    const produtoDto = {
      nome: createProdutoDto.nome,
      marca: createProdutoDto.marca,
      preco: createProdutoDto.preco,
      quantidade: createProdutoDto.quantidade,
    };
    const produtoNovo = this.produtoRepository.create(produtoDto);
    return await this.produtoRepository.save(produtoNovo);
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

  async update(id: number, updateProdutoDto: UpdateProdutoDto) {
    const produtoDto = {
      nome: updateProdutoDto.nome,
      marca: updateProdutoDto.marca,
      preco: updateProdutoDto.preco,
      quantidade: updateProdutoDto.quantidade,
    };

    const produto = await this.produtoRepository.preload(
      {
        id,
        ...produtoDto,
      })
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
