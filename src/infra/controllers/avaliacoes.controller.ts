import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseInterceptors,
  ValidationPipe,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiParam, ApiResponse, ApiBody } from "@nestjs/swagger";
import { AvaliacoesService } from "../../application/services/avaliacoes.service";
import { CreateAvaliacoesDto } from "../../application/dtos/create-avaliacoes.dto";
import { UpdateAvaliacoesDto } from "../../application/dtos/update-avaliacoes.dto";
import { CabecalhoInterceptor } from "../interceptors/cabecalho.interceptor";
import { ProdutoRepository } from "src/application/repositories/produto.repository";

@ApiTags("Avaliações")
@Controller("avaliacoes")
@UseInterceptors(CabecalhoInterceptor)
export class AvaliacoesController {
  constructor(private readonly avaliacoesService: AvaliacoesService) {}

 @ApiOperation({ summary: "Cria uma nova avaliação" })
@ApiResponse({ status: 201, description: "Avaliação criada com sucesso." })
@ApiResponse({ status: 400, description: "Dados inválidos." }) 
@ApiResponse({ status: 404, description: "Produto não encontrado." }) 
@ApiBody({
  description: "Detalhes da avaliação a ser criada",
  schema: {
    type: 'object',
    properties: {
      produto_id: { type: 'number', example: 1 },
      nome_Pessoa: { type: 'string', example: 'Paul McCartney' },
      idade: { type: 'number', example: 82 },
      email: { type: 'string', example: 'paul@gmail.com' },
      nota: { type: 'string', example: '5' },
      comentario: { type: 'string', example: 'Produto de ótima qualidade!' },
      origem_Animal: { type: 'boolean', example: false },
      origem_Vegetal: { type: 'boolean', example: true },
      embalagem_Reciclavel: { type: 'boolean', example: true },
      nacional: { type: 'boolean', example: true },
    },
  },
})
@Post()
async create(@Body(new ValidationPipe()) createAvaliacoesDto: CreateAvaliacoesDto) {
  const avaliacaoCriada = await this.avaliacoesService.create(createAvaliacoesDto);
  return {
    message: `Sua avaliação foi feita com sucesso!`,
    avaliacao: avaliacaoCriada,
  };
}



  @ApiOperation({ summary: "Lista todas as avaliações" })
  @ApiResponse({
    status: 200,
    description: "Lista de avaliações retornada com sucesso.",
  })
  @Get()
  findAll() {
    return this.avaliacoesService.findAll();
  }

  @ApiOperation({ summary: "Retorna uma avaliação pelo ID" })
  @ApiParam({ name: "id", description: "ID da avaliação", type: String })
  @ApiResponse({ status: 200, description: "Avaliação retornada com sucesso." })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.avaliacoesService.findOne(+id);
  }

  @ApiOperation({ summary: "Atualiza uma avaliação pelo ID" })
  @ApiParam({ name: "id", description: "ID da avaliação", type: String })
  @ApiResponse({
    status: 200,
    description: "Avaliação atualizada com sucesso.",
  })
  @Put(":id")
  update(
    @Param("id") id: string,
    @Body() updateAvaliacoesDto: UpdateAvaliacoesDto
  ) {
    return this.avaliacoesService.update(+id, updateAvaliacoesDto);
  }


  @ApiOperation({ summary: "Remove uma avaliação pelo ID" })
  @ApiParam({ name: "id", description: "ID da avaliação", type: String })
  @ApiResponse({ status: 200, description: "Avaliação removida com sucesso." })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.avaliacoesService.remove(+id);
  }
}
