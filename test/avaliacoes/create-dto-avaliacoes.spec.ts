import { validate } from 'class-validator';
import { CreateAvaliacoesDto } from 'src/application/dtos/create-avaliacoes.dto';

describe('CreateAvaliacoesDto', () => {
  it('deve criar uma instância com propriedades válidas', async () => {
    const dto = new CreateAvaliacoesDto({
      nome_Pessoa: 'Paul McCartney',
      idade: 82,
      email: 'paul@gmail.com',
      nota: '5',
      comentario: 'Produto de ótima qualidade!',
      origem_Animal: false,
      origem_Vegetal: true,
      livreDe_Crueldade: true,
      embalagem_Reciclavel: true,
      nacional: true,
      produto_id: 2,
    });

    const errors = await validate(dto);
    expect(errors.length).toBe(0); 
  });

  it('não deve permitir valores inválidos', async () => {
    const dto = new CreateAvaliacoesDto({
      nome_Pessoa: '', 
      idade: -5, 
      email: 'not-an-email', 
      nota: '',
      comentario: '',
      origem_Animal: false,
      origem_Vegetal: true,
      livreDe_Crueldade: true,
      embalagem_Reciclavel: true,
      nacional: true,
      produto_id: -1, 
    });

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0); 
  });
});
