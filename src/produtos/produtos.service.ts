import { Inject, Injectable } from '@nestjs/common';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Produto } from './entities/produto.entity';
import { Repository } from 'typeorm';

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
      quantidade: createProdutoDto.quantidade
    };
    const produtoNovo = this.produtoRepository.create(produtoDto);
    return await this.produtoRepository.save(produtoNovo);
  }

  findAll() {
    return `This action returns all produtos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} produto`;
  }

  update(id: number, updateProdutoDto: UpdateProdutoDto) {
    return `This action updates a #${id} produto`;
  }

  remove(id: number) {
    return `This action removes a #${id} produto`;
  }
}
