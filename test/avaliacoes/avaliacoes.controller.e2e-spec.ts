import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { CreateAvaliacoesDto } from '../../src/application/dtos/create-avaliacoes.dto';
import { UpdateAvaliacoesDto } from '../../src/application/dtos/update-avaliacoes.dto';

describe('AvaliacoesController (e2e)', () => {
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

  it('deve criar uma nova avaliação', async () => {
    const createAvaliacoesDto: CreateAvaliacoesDto = {
      nome_Pessoa: 'Alice',
      idade: 28,
      email: 'alice@example.com',
      nota: String (5),
      comentario: 'Excelente produto!',
      origem_Animal: false,
      origem_Vegetal: true,
      embalagem_Reciclavel: true,
      nacional: true,
      produto_id: 1,
    };

    const response = await request(app.getHttpServer())
      .post('/avaliacoes')
      .send(createAvaliacoesDto)
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.nome_Pessoa).toEqual(createAvaliacoesDto.nome_Pessoa);
  });

  it('deve listar todas as avaliações', async () => {
    const response = await request(app.getHttpServer())
      .get('/avaliacoes')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });

  it('deve retornar uma avaliação pelo ID', async () => {
    const createAvaliacoesDto: CreateAvaliacoesDto = {
      nome_Pessoa: 'Bob',
      idade: 35,
      email: 'bob@example.com',
      nota: String (4),
      comentario: 'Bom produto!',
      origem_Animal: true,
      origem_Vegetal: false,
      embalagem_Reciclavel: true,
      nacional: false,
      produto_id: 1,
    };

    const createResponse = await request(app.getHttpServer())
      .post('/avaliacoes')
      .send(createAvaliacoesDto)
      .expect(201);

    const avaliacaoId = createResponse.body.id;

    const response = await request(app.getHttpServer())
      .get(`/avaliacoes/${avaliacaoId}`)
      .expect(200);

    expect(response.body.id).toEqual(avaliacaoId);
  });

  it('deve atualizar uma avaliação pelo ID', async () => {
    const createAvaliacoesDto: CreateAvaliacoesDto = {
      nome_Pessoa: 'Charlie',
      idade: 22,
      email: 'charlie@example.com',
      nota:String (3),
      comentario: 'Produto ok.',
      origem_Animal: false,
      origem_Vegetal: true,
      embalagem_Reciclavel: true,
      nacional: true,
      produto_id: 1,
    };

    const createResponse = await request(app.getHttpServer())
      .post('/avaliacoes')
      .send(createAvaliacoesDto)
      .expect(201);

    const avaliacaoId = createResponse.body.id;

    const updateAvaliacoesDto: UpdateAvaliacoesDto = {
      comentario: 'Produto muito bom!',
    };

    const updateResponse = await request(app.getHttpServer())
      .put(`/avaliacoes/${avaliacaoId}`)
      .send(updateAvaliacoesDto)
      .expect(200);

    expect(updateResponse.body.comentario).toEqual(updateAvaliacoesDto.comentario);
  });

  it('deve remover uma avaliação pelo ID', async () => {
    const createAvaliacoesDto: CreateAvaliacoesDto = {
      nome_Pessoa: 'David',
      idade: 29,
      email: 'david@example.com',
      nota: String (5),
      comentario: 'Adorei!',
      origem_Animal: true,
      origem_Vegetal: true,
      embalagem_Reciclavel: false,
      nacional: true,
      produto_id: 1,
    };

    const createResponse = await request(app.getHttpServer())
      .post('/avaliacoes')
      .send(createAvaliacoesDto)
      .expect(201);

    const avaliacaoId = createResponse.body.id;

    await request(app.getHttpServer())
      .delete(`/avaliacoes/${avaliacaoId}`)
      .expect(200);

    await request(app.getHttpServer())
      .get(`/avaliacoes/${avaliacaoId}`)
      .expect(404);
  });
});
