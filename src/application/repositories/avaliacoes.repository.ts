import { Avaliacao } from "src/domain/entities/avaliacoes.entity";
import { Repository } from "typeorm";


export class AvaliacaoRepository extends Repository<Avaliacao> {
  
  async findById(id: number): Promise<Avaliacao | null> {
    return this.findOne({ where: { id } }); 
  }

  
  async createAvaliacao(createAvaliacaoDto: Partial<Avaliacao>): Promise<Avaliacao> {
    const avaliacao = this.create(createAvaliacaoDto);
    return this.save(avaliacao);
  }

  
  async removeAvaliacao(id: number): Promise<Avaliacao> {
    const avaliacao = await this.findById(id);
    if (!avaliacao) {
      throw new Error(`Avaliacao com ID ${id} não encontrado`);
    }
    return this.remove(avaliacao);
    }
}

export default AvaliacaoRepository;