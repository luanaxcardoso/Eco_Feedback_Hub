import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { CreateAvaliacoesDto } from 'src/application/dtos/create-avaliacoes.dto';
import { Avaliacao } from 'src/domain/entities/avaliacoes.entity';
import { AvaliacoesService } from 'src/application/services/avaliacoes.service';
import { ProdutosService } from 'src/application/services/produtos.service';
import { Produto } from 'src/domain/entities/produto.entity'; 
import { CategoriaProduto } from 'src/domain/enum/categoria-produto.enum';

describe('AvaliacoesService', () => {
  let avaliacaoService: AvaliacoesService;
  let mockAvaliacaoRepository: Partial<Repository<Avaliacao>>;
  let mockProdutosService: Partial<ProdutosService>;

  beforeEach(async () => {
    mockAvaliacaoRepository = {
      create: jest.fn(),
      save: jest.fn(),
    };

    mockProdutosService = {
      findOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AvaliacoesService,
        {
          provide: getRepositoryToken(Avaliacao),
          useValue: mockAvaliacaoRepository,
        },
        {
          provide: ProdutosService,
          useValue: mockProdutosService,
        },
      ],
    }).compile();

    avaliacaoService = module.get<AvaliacoesService>(AvaliacoesService);
  });

  it('deve criar uma nova avaliação com sucesso', async () => {
    const createAvaliacaoDto: CreateAvaliacoesDto = {
      nome_Pessoa: 'Maria',
      idade: 25,
      email: 'maria@gmail.com',
      comentario: 'Gostei muito do produto!',
      nota: '5',
      origem_Animal: true,
      origem_Vegetal: false,
      embalagem_Reciclavel: true,
      nacional: true,
      produto_id: 1,
    };

    const produtoMock: Produto = {
      id: 1,
      nome: 'Quibe de Soja',
      marca: 'Seara',
      preco: 20,
      quantidade: 10,
      categoria: CategoriaProduto.ALIMENTO,
      avaliacoes: [],  
    };

    const avaliacaoMock: Avaliacao = {
      id: 1,
      ...createAvaliacaoDto,
      produto: produtoMock,
    } as Avaliacao;

    mockProdutosService.findOne = jest.fn().mockResolvedValue(produtoMock);
    mockAvaliacaoRepository.create = jest.fn().mockReturnValue(avaliacaoMock);
    mockAvaliacaoRepository.save = jest.fn().mockResolvedValue(avaliacaoMock);

    const result = await avaliacaoService.create(createAvaliacaoDto);
    
    expect(result).toEqual({
      id: avaliacaoMock.id,
      ...avaliacaoMock,
      produto: {
        id: produtoMock.id,
        nome: produtoMock.nome,
      },
    });

    expect(mockProdutosService.findOne).toHaveBeenCalledWith(createAvaliacaoDto.produto_id);
    expect(mockAvaliacaoRepository.create).toHaveBeenCalledWith({
      ...createAvaliacaoDto,
      produto: produtoMock,
    });
    expect(mockAvaliacaoRepository.save).toHaveBeenCalledWith(avaliacaoMock);
  });

  it('deve lançar NotFoundException se o produto não for encontrado', async () => {
    const createAvaliacaoDto: CreateAvaliacoesDto = {
      nome_Pessoa: 'Carlos',
      idade: 30,
      email: 'carlos@gmail.com',
      comentario: 'Avaliação não encontrada',
      nota: '4',
      origem_Animal: true,
      origem_Vegetal: false,
      embalagem_Reciclavel: true,
      nacional: true,
      produto_id: 999,
      
    };

    mockProdutosService.findOne = jest.fn().mockResolvedValue(null);

    await expect(avaliacaoService.create(createAvaliacaoDto)).rejects.toThrow(NotFoundException);
    expect(mockProdutosService.findOne).toHaveBeenCalledWith(createAvaliacaoDto.produto_id);
  });
});
