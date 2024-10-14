import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateAvaliacoesDto } from "../dtos/create-avaliacoes.dto";
import { UpdateAvaliacoesDto } from "../dtos/update-avaliacoes.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Avaliacao } from "../../domain/entities/avaliacoes.entity";
import { Repository } from "typeorm";
import { ProdutosService } from "./produtos.service";

@Injectable()
export class AvaliacoesService {
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
      ...avaliacao,
      produto: produto.nome,
    };
  }


  async findAll() {
    const avaliacoes = await this.avaliacaoRepository.find({
      order: {
        id: "ASC",
      },
    });
    return avaliacoes;
  }


  async findOne(id: number) {
    const avaliacao = await this.avaliacaoRepository.findOneBy({
      id,
    });
    if (!avaliacao) {
      throw new NotFoundException("Avaliacao não encontrada");
    }
    return avaliacao;
  }


  async update(id: number, updateAvaliacoesDto: Partial<UpdateAvaliacoesDto>) {
    const avaliacao = await this.avaliacaoRepository.findOne({where: {id}});
    if (!avaliacao) {
      throw new NotFoundException("Avaliacao não encontrada");
    }

    Object.assign(avaliacao, updateAvaliacoesDto);

    return await this.avaliacaoRepository.save(avaliacao);  
      
  }


  async remove(id: number) {
   const avaliacao = await this.avaliacaoRepository.findOneBy({
      id,
  });
  if (!avaliacao) {
    throw new NotFoundException("Avaliacao não encontrada");
  }
  return this.avaliacaoRepository.remove(avaliacao);
  }
}
