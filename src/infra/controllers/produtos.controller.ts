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
  NotFoundException,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiParam, ApiResponse, ApiBody } from "@nestjs/swagger";
import { ProdutosService } from "../../application/services/produtos.service";
import { CreateProdutoDto } from "../../application/dtos/create-produto.dto";
import { UpdateProdutoDto } from "../../application/dtos/update-produto.dto";
import { CabecalhoInterceptor } from "../interceptors/cabecalho.interceptor";
import { CategoriaProduto } from "src/domain/enum/categoria-produto.enum";

@ApiTags("Produtos")
@Controller("produtos")
@UseInterceptors(CabecalhoInterceptor)
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {}

  @ApiOperation({ summary: "Cria um novo produto" })
  @ApiResponse({ status: 201, description: "Produto criado com sucesso." })
  @ApiResponse({ status: 400, description: "Erro de validação." })
  @ApiBody({
    description: "Detalhes do produto a ser criado",
    type: CreateProdutoDto, 
    examples: {
      'Alimento': {
        value: {
          nome: 'Hamburguer de soja',
          marca: 'Futuro Burguer',
          preco: 20.00,
          quantidade: 6,
          categoria: 'Alimento' 
        }
      },
      'Bebida': {
        value: {
          nome: 'Suco de Laranja',
          marca: 'Tropicana',
          preco: 5.00,
          quantidade: 1,
          categoria: 'Bebida' 
        }
      },
      'Limpeza': {
        value: {
          nome: 'Detergente',
          marca: 'VinaGreen',
          preco: 3.50,
          quantidade: 1,
          categoria: 'Limpeza' 
        }
      },
      'Cosmético': {
        value: {
          nome: 'Creme Hidratante ',
          marca: 'Organic Shop',
          preco: 25.00,
          quantidade: 1,
          categoria: 'Cosmetico' 
        }
      },
      'Outro': {
        value: {
          nome: 'Bota',
          marca: 'Vegano Shoes',
          preco: 220.00,
          quantidade: 1,
          categoria: 'Outro' 
        }
      },
    }
  })
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
  @ApiResponse({ status: 500, description: "Erro interno no servidor." })
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

  @ApiOperation({ summary: "Retorna produtos pela categoria" })
  @ApiResponse({
    status: 200,
    description: 'Retorna os produtos filtrados por categoria',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          categoria: {
            type: 'string',
            description: 'Categoria do produto',
            example: 'Alimento, Bebida, Limpeza, Cosmetico, Outro',
          },
        },
      },
    },
  })
  
  @ApiResponse({ status: 404, description: "Categoria não encontrada." })
  @ApiParam({ 
    name: "categoria", 
    description: "Categoria do produto", 
    enum: CategoriaProduto,  
    required: true 
  })
  @Get("categoria/:categoria")
  async findOneByCategoria(@Param("categoria") categoria: string) {
    return await this.produtosService.findOneByCategoria(categoria);
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
    const produtoId = Number(id);
    const produtoExistente = await this.produtosService.findOne(produtoId);
    if (!produtoExistente) {
      throw new NotFoundException(`Produto com ID ${produtoId} não encontrado.`);
    }

    await this.produtosService.remove(produtoId);
    
    return {
      message: `Produto com ID ${produtoId} foi removido com sucesso.`,
      produto: produtoExistente, 
    };
  }

  
}