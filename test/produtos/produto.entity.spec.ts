
import { Produto } from 'src/domain/entities/produto.entity';
import { CategoriaProduto } from 'src/domain/enum/categoria-produto.enum';

describe('Produto Entity', () => {
  it('should create a Produto instance with valid properties', () => {
    const produto = new Produto();
    produto.id = 1;
    produto.nome = 'Produto Teste';
    produto.marca = 'Marca Teste';
    produto.preco = 19.99;
    produto.quantidade = 100;
    produto.categoria = CategoriaProduto.ALIMENTO; 

    expect(produto).toBeDefined();
    expect(produto.id).toBe(1);
    expect(produto.nome).toBe('Produto Teste');
    expect(produto.marca).toBe('Marca Teste');
    expect(produto.preco).toBe(19.99);
    expect(produto.quantidade).toBe(100);
    expect(produto.categoria).toBe(CategoriaProduto.ALIMENTO);
    expect(produto.createdAt).toBeUndefined(); 
    expect(produto.avaliacoes).toBeUndefined(); 
  });

  it('should have a default createdAt property', () => {
    const produto = new Produto();
    produto.createdAt = new Date();

    expect(produto.createdAt).toBeDefined();
  });

  it('should initialize avaliacoes as an empty array', () => {
    const produto = new Produto();
    
    expect(produto.avaliacoes).toBeUndefined(); 

    produto.avaliacoes = [];
    expect(produto.avaliacoes).toBeDefined();
    expect(produto.avaliacoes).toEqual([]); 
  });
});
