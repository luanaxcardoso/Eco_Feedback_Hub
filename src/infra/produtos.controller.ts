import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from "@nestjs/common";
import { ProdutosService } from "../application/services/produtos.service";
import { CreateProdutoDto } from "../application/dto/create-produto.dto";
import { UpdateProdutoDto } from "../application/dto/update-produto.dto";

@Controller("produtos")
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {}

  @Post()
  create(@Body() createProdutoDto: CreateProdutoDto) {
    return this.produtosService.create(createProdutoDto);
  }

  @Get()
  findAll() {
    return this.produtosService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.produtosService.findOne(+id);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() updateProdutoDto: UpdateProdutoDto) {
    return this.produtosService.update(+id, updateProdutoDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.produtosService.remove(+id);
  }
}
