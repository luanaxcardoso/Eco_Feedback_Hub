import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { CreateProdutoDto } from '../../src/application/dtos/create-produto.dto';
import { UpdateProdutoDto } from '../../src/application/dtos/update-produto.dto';
import { CategoriaProduto } from 'src/domain/enum/categoria-produto.enum';

describe('ProdutosController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  }, 30000);

  afterAll(async () => {
    await app.close();
  }, 30000);

  it('deve criar um novo produto', async () => {
    const createProdutoDto: CreateProdutoDto = {
      nome: 'Mousse de Chocolate',
      marca: 'Vida Veg',
      preco: 10,
      quantidade: 2,
      categoria: CategoriaProduto.ALIMENTO,
    };

    const response = await request(app.getHttpServer())
      .post('/produtos')
      .send(createProdutoDto)
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.nome).toEqual(createProdutoDto.nome);
  });

  it('deve listar todos os produtos', async () => {
    const response = await request(app.getHttpServer())
      .get('/produtos')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });

  it('deve retornar um produto pelo ID', async () => {
    const createProdutoDto: CreateProdutoDto = {
        nome: 'Mousse de Chocolate',
        marca: 'Vida Veg',
        preco: 10,
        quantidade: 2,
      categoria: CategoriaProduto.ALIMENTO,
    };

    const createResponse = await request(app.getHttpServer())
      .post('/produtos')
      .send(createProdutoDto)
      .expect(201);

    const produtoId = createResponse.body.id;

    const response = await request(app.getHttpServer())
      .get(`/produtos/${produtoId}`)
      .expect(200);

    expect(response.body.id).toEqual(produtoId);
  });

  it('deve atualizar um produto pelo ID', async () => {
    const createProdutoDto: CreateProdutoDto = {
        nome: 'Mousse de Chocolate',
      marca: 'Vida Veg',
      preco: 10,
      quantidade: 2,
      categoria: CategoriaProduto.ALIMENTO,
    };

    const createResponse = await request(app.getHttpServer())
      .post('/produtos')
      .send(createProdutoDto)
      .expect(201);

    const produtoId = createResponse.body.id;

    const updateProdutoDto: UpdateProdutoDto = {
        nome: 'Mousse de Morango',
        marca: 'Vida Veg',
        preco: 10,
        quantidade: 2,
      categoria: CategoriaProduto.BEBIDA,
    };

    const updateResponse = await request(app.getHttpServer())
      .put(`/produtos/${produtoId}`)
      .send(updateProdutoDto)
      .expect(200);

    expect(updateResponse.body.nome).toEqual(updateProdutoDto.nome);
  });

  it('deve remover um produto pelo ID', async () => {
    const createProdutoDto: CreateProdutoDto = {
        nome: 'Mousse de Chocolate',
        marca: 'Vida Veg',
        preco: 10,
        quantidade: 2,
      categoria: CategoriaProduto.ALIMENTO,
    };

    const createResponse = await request(app.getHttpServer())
      .post('/produtos')
      .send(createProdutoDto)
      .expect(201);

    const produtoId = createResponse.body.id;

    await request(app.getHttpServer())
      .delete(`/produtos/${produtoId}`)
      .expect(200);

    await request(app.getHttpServer())
      .get(`/produtos/${produtoId}`)
      .expect(404);
  });
});
