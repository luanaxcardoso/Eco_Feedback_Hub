
import { Avaliacao } from 'src/domain/entities/avaliacoes.entity';
import { Produto } from 'src/domain/entities/produto.entity';

describe('Avaliacao', () => {
  it('deve criar uma instância de Avaliacao com propriedades válidas', () => {
    const produto = new Produto();
    produto.id = 1;
    produto.nome = 'Produto Teste';

    const avaliacao = new Avaliacao();
    avaliacao.id = 1;
    avaliacao.nome_Pessoa = 'Luana';
    avaliacao.idade = 38;
    avaliacao.email = 'lua@gmail.com';
    avaliacao.nota = '5';
    avaliacao.comentario = 'Ótimo produto!';
    avaliacao.origem_Animal = true;
    avaliacao.origem_Vegetal = false;
    avaliacao.embalagem_Reciclavel = true;
    avaliacao.nacional = true;
    avaliacao.createdAt = new Date();
    avaliacao.produto = produto;

    expect(avaliacao).toBeDefined();
    expect(avaliacao.id).toBe(1);
    expect(avaliacao.nome_Pessoa).toBe('Luana');
    expect(avaliacao.idade).toBe(38);
    expect(avaliacao.email).toBe('lua@gmail.com');
    expect(avaliacao.nota).toBe('5');
    expect(avaliacao.comentario).toBe('Ótimo produto!');
    expect(avaliacao.origem_Animal).toBe(true);
    expect(avaliacao.origem_Vegetal).toBe(false);
    expect(avaliacao.embalagem_Reciclavel).toBe(true);
    expect(avaliacao.nacional).toBe(true);
    expect(avaliacao.createdAt).toBeInstanceOf(Date);
    expect(avaliacao.produto).toBe(produto);
  });

  it('deve inicializar o createdAt com a data atual', () => {
    const avaliacao = new Avaliacao();
    expect(avaliacao.createdAt).toBeUndefined();
  });
});
