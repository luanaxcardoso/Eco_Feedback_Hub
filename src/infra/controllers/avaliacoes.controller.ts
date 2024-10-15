import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseInterceptors,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";
import { AvaliacoesService } from "../../application/services/avaliacoes.service";
import { CreateAvaliacoesDto } from "../../application/dtos/create-avaliacoes.dto";
import { UpdateAvaliacoesDto } from "../../application/dtos/update-avaliacoes.dto";
import { CabecalhoInterceptor } from "../interceptors/cabecalho.interceptor";

@ApiTags("Avaliações")
@Controller("avaliacoes")
@UseInterceptors(CabecalhoInterceptor)
export class AvaliacoesController {
  constructor(private readonly avaliacoesService: AvaliacoesService) {}

  @ApiOperation({ summary: "Cria uma nova avaliação" })
  @ApiResponse({ status: 201, description: "Avaliação criada com sucesso." })
  @Post()
  create(@Body() createAvaliacoesDto: CreateAvaliacoesDto) {
    return this.avaliacoesService.create(createAvaliacoesDto);
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
