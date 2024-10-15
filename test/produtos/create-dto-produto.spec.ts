import { validate } from 'class-validator';
import { CreateProdutoDto } from 'src/application/dtos/create-produto.dto';
import { CategoriaProduto } from 'src/domain/enum/categoria-produto.enum';

describe('CreateProdutoDto', () => {
  it('deve criar uma instância com propriedades válidas', async () => {
    const dto = new CreateProdutoDto({
      nome: 'Hamburguer de soja',
      marca: 'Futuro Burguer',
      preco: 20.00,
      quantidade: 6,
      categoria: CategoriaProduto.ALIMENTO,
    });

    const errors = await validate(dto);
    expect(errors.length).toBe(0); 
  });

  it('deve falhar se o nome estiver vazio', async () => {
    const dto = new CreateProdutoDto({
      nome: '', 
      marca: 'Futuro Burguer',
      preco: 20.00,
      quantidade: 6,
      categoria: CategoriaProduto.ALIMENTO,
    });

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0); 
  });

  it('deve falhar se a marca estiver vazia', async () => {
    const dto = new CreateProdutoDto({
      nome: 'Hamburguer de soja',
      marca: '', 
      preco: 20.00,
      quantidade: 6,
      categoria: CategoriaProduto.ALIMENTO,
    });

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0); 
  });

  it('deve falhar se o preço não for positivo', async () => {
    const dto = new CreateProdutoDto({
      nome: 'Hamburguer de soja',
      marca: 'Futuro Burguer',
      preco: -20.00, 
      quantidade: 6,
      categoria: CategoriaProduto.ALIMENTO,
    });

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('deve falhar se a quantidade não for fornecida', async () => {
    const dto = new CreateProdutoDto({
      nome: 'Hamburguer de soja',
      marca: 'Futuro Burguer',
      preco: 20.00,
      quantidade: undefined, 
      categoria: CategoriaProduto.ALIMENTO,
    });

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0); 
  });

  it('deve falhar se a categoria não for válida', async () => {
    const dto = new CreateProdutoDto({
      nome: 'Hamburguer de soja',
      marca: 'Futuro Burguer',
      preco: 20.00,
      quantidade: 6,
      categoria: undefined, 
    });

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0); 
  });
});
