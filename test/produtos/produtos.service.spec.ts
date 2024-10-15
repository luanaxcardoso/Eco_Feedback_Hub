import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProdutosService } from 'src/application/services/produtos.service';
import { Produto } from 'src/domain/entities/produto.entity';
import { CreateProdutoDto } from 'src/application/dtos/create-produto.dto';
import { CategoriaProduto } from 'src/domain/enum/categoria-produto.enum';

describe('ProdutosService', () => {
    let service: ProdutosService;
    let produtoRepository: Repository<Produto>;
  
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          ProdutosService,
          {
            provide: getRepositoryToken(Produto),
            useValue: {
              create: jest.fn(),
              save: jest.fn(),
            },
          },
        ],
      }).compile();
  
      service = module.get<ProdutosService>(ProdutosService);
      produtoRepository = module.get<Repository<Produto>>(getRepositoryToken(Produto));
    });
  
    it('deve criar um novo produto', async () => {
      const createProdutoDto: CreateProdutoDto = {
        nome: 'Produto Teste',
        marca: 'Marca Teste',
        preco: 100.00,
        quantidade: 10,
        categoria: CategoriaProduto.ALIMENTO, 
      };
  
      const produtoSalvo: Produto = { 
        id: 1, 
        ...createProdutoDto,
        avaliacoes: [] 
      };
  
      jest.spyOn(produtoRepository, 'create').mockReturnValue(produtoSalvo);
      jest.spyOn(produtoRepository, 'save').mockResolvedValue(produtoSalvo);
  
      const resultado = await service.create(createProdutoDto);
  
      expect(produtoRepository.create).toHaveBeenCalledWith(createProdutoDto);
      expect(produtoRepository.save).toHaveBeenCalledWith(produtoSalvo);
      expect(resultado).toEqual({
        id: produtoSalvo.id,
        ...produtoSalvo,
      });
    });
  });