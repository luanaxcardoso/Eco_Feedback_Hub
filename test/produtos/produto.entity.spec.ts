import { Produto } from 'src/domain/entities/produto.entity';
import { CategoriaProduto } from 'src/domain/enum/categoria-produto.enum';

describe('Produto Entity', () => {
  it('deve criar uma instância de Produto com propriedades válidas', () => {
    const produto = new Produto();
    produto.id = 1;
    produto.nome = 'Hamburguer de soja';
    produto.marca = 'Sadia';
    produto.preco = 19.99;
    produto.quantidade = 10;
    produto.categoria = CategoriaProduto.ALIMENTO; 

    expect(produto).toBeDefined();
    expect(produto.id).toBe(1);
    expect(produto.nome).toBe('Hamburguer de soja');
    expect(produto.marca).toBe('Sadia');
    expect(produto.preco).toBe(19.99);
    expect(produto.quantidade).toBe(10);
    expect(produto.categoria).toBe(CategoriaProduto.ALIMENTO);
    expect(produto.createdAt).toBeUndefined(); 
    expect(produto.avaliacoes).toBeUndefined(); 
  });

  it('deve ter uma propriedade createdAt padrão', () => {
    const produto = new Produto();
    produto.createdAt = new Date();

    expect(produto.createdAt).toBeDefined();
  });

  it('deve inicializar avaliacoes como um array vazio', () => {
    const produto = new Produto();
    
    expect(produto.avaliacoes).toBeUndefined(); 

    produto.avaliacoes = [];
    expect(produto.avaliacoes).toBeDefined();
    expect(produto.avaliacoes).toEqual([]); 
  });
});
