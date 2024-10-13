import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAvaliacoesDto } from './dto/create-avaliacoes.dto';
import { UpdateAvaliacoesDto } from './dto/update-avaliacoes.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Avaliacao } from './entities/avaliacoes.entity';
import { Repository } from 'typeorm';
import { ProdutosService } from '../application/services/produtos.service';

@Injectable()
export class AvaliacoesService {
  constructor(
    @InjectRepository(Avaliacao)
    private readonly avaliacaoRepository: Repository<Avaliacao>,
    private readonly produtosService: ProdutosService
) {}


async create(createAvaliacoesDto: CreateAvaliacoesDto) {
  const produto = await this.produtosService.findOne(createAvaliacoesDto.produto_id);
  
  if (!produto) {
    throw new NotFoundException('Produto não encontrado');
  }

  const novaAvaliacao = {
    ...createAvaliacoesDto,
    produto 
  };

  const avaliacao = this.avaliacaoRepository.create(novaAvaliacao);
  await this.avaliacaoRepository.save(avaliacao); 

  
  return {
    ...avaliacao,
    produto: produto.nome
  }; 
}



  findAll() {
    return `This action returns all avaliacoes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} avaliacoe`;
  }

  update(id: number, updateAvaliacoesDto: UpdateAvaliacoesDto) {
    return `This action updates a #${id} avaliacoe`;
  }

  remove(id: number) {
    return `This action removes a #${id} avaliacoe`;
  }
}
