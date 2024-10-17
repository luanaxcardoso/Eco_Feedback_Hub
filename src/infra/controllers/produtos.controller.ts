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
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";
import { ProdutosService } from "../../application/services/produtos.service";
import { CreateProdutoDto } from "../../application/dtos/create-produto.dto";
import { UpdateProdutoDto } from "../../application/dtos/update-produto.dto";
import { CabecalhoInterceptor } from "../interceptors/cabecalho.interceptor";

@ApiTags("Produtos")
@Controller("produtos")
@UseInterceptors(CabecalhoInterceptor)
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {}

  @ApiOperation({ summary: "Cria um novo produto" })
  @ApiResponse({ status: 201, description: "Produto criado com sucesso." })
  @ApiResponse({ status: 400, description: "Erro de validação." })
  @Post()
  async create(@Body(new ValidationPipe()) createProdutoDto: CreateProdutoDto) {
    return await this.produtosService.create(createProdutoDto);
  }

  @ApiOperation({ summary: "Lista todos os produtos" })
  @ApiResponse({
    status: 200,
    description: "Lista de produtos retornada com sucesso.",
  })
  @ApiResponse({ status: 400, description: "Erro de validação." })
  @Get()
  async findAll() {
    return await this.produtosService.findAll();
  }

  @ApiOperation({ summary: "Retorna um produto pelo ID" })
  @ApiParam({ name: "id", description: "ID do produto", type: String })
  @ApiResponse({ status: 200, description: "Produto retornado com sucesso." })
  @ApiResponse({ status: 404, description: "Produto não encontrado." })
  @Get(":id")
  async findOne(@Param("id") id: string) {
    return await this.produtosService.findOne(Number(id));
  }

  @ApiOperation({ summary: "Atualiza um produto pelo ID" })
  @ApiParam({ name: "id", description: "ID do produto", type: String })
  @ApiResponse({ status: 200, description: "Produto atualizado com sucesso." })
  @ApiResponse({ status: 404, description: "Produto não encontrado." })
  @Put(":id")
  async update(@Param("id") id: string, @Body() updateProdutoDto: UpdateProdutoDto) {
    return await this.produtosService.update(Number(id), updateProdutoDto);
  }

  @ApiOperation({ summary: "Remove um produto pelo ID" })
  @ApiParam({ name: "id", description: "ID do produto", type: String })
  @ApiResponse({ status: 200, description: "Produto removido com sucesso." })
  @ApiResponse({ status: 404, description: "Produto não encontrado." })
  @Delete(":id")
  async remove(@Param("id") id: string) {
    return await this.produtosService.remove(Number(id));
  }
}