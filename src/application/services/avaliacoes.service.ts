import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateAvaliacoesDto } from "../dtos/create-avaliacoes.dto";
import { UpdateAvaliacoesDto } from "../dtos/update-avaliacoes.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Avaliacao } from "../../domain/entities/avaliacoes.entity";
import { Repository } from "typeorm";
import { ProdutosService } from "./produtos.service";



@Injectable()
export class AvaliacoesService {
  ProdutoRepository: any;
  constructor(
    @InjectRepository(Avaliacao)
    private readonly avaliacaoRepository: Repository<Avaliacao>,
    private readonly produtosService: ProdutosService
  ) {}
  

  async create(createAvaliacoesDto: CreateAvaliacoesDto) {
    const produto = await this.produtosService.findOne(
      createAvaliacoesDto.produto_id
    );

    if (!produto) {
      throw new NotFoundException("Produto não encontrado");
    }

    const novaAvaliacao = {
      ...createAvaliacoesDto,
      produto,
    };

    const avaliacao = this.avaliacaoRepository.create(novaAvaliacao);
    await this.avaliacaoRepository.save(avaliacao);

    return {
      id: avaliacao.id,
      ...avaliacao,
      produto:{
        id: produto.id,
        nome: produto.nome,
        marca: produto.marca,
      }
      
    };
  }

  async findAll() {
    const avaliacoes = await this.avaliacaoRepository.find({
      relations: ["produto"],
      order: {
        id: "ASC",
      },
      take: 10,
    });
    return avaliacoes;
    
  }


  async findOne(id: number) {
    const avaliacao = await this.avaliacaoRepository.findOne({
      where: {id},
      relations: ["produto"],
    });
    if (!avaliacao) {
      throw new NotFoundException("Avaliacao não encontrada");
    }
    return avaliacao
    
    ;
  }


  async update(id: number, updateAvaliacoesDto: Partial<UpdateAvaliacoesDto>) {
    const avaliacao = await this.avaliacaoRepository.findOne({
      where: { id },
      relations: ["produto"], 
    });
  
    if (!avaliacao) {
      throw new NotFoundException("Avaliacao não encontrada");
    }
  
    Object.assign(avaliacao, updateAvaliacoesDto);
    const updatedAvaliacao = await this.avaliacaoRepository.save(avaliacao);
  
    const produto = avaliacao.produto;
  
    return {
      id: updatedAvaliacao.id,
      ...updatedAvaliacao,
      produto: {
        id: produto.id,
        nome: produto.nome,
      },
    };
  } 
  
  


  async remove(id: number) {
    const avaliacao = await this.avaliacaoRepository.findOne({
      where: { id },
      relations: ['produto'],
    });
  
    if (!avaliacao) {
      throw new NotFoundException("Avaliacao não encontrada");
    }
  
    await this.avaliacaoRepository.remove(avaliacao);
  
    return {
      produtoId: avaliacao.produto.id,
      produtoNome: avaliacao.produto.nome,
      avaliacao: avaliacao,
    };
  }
}  
