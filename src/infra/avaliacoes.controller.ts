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
import { AvaliacoesService } from "../application/services/avaliacoes.service";
import { CreateAvaliacoesDto } from "../application/dtos/create-avaliacoes.dto";
import { UpdateAvaliacoesDto } from "../application/dtos/update-avaliacoes.dto";

@Controller("avaliacoes")
export class AvaliacoesController {
  constructor(private readonly avaliacoesService: AvaliacoesService) {}

  @Post()
  create(@Body() createAvaliacoesDto: CreateAvaliacoesDto) {
    return this.avaliacoesService.create(createAvaliacoesDto);
  }

  @Get()
  findAll() {
    return this.avaliacoesService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.avaliacoesService.findOne(+id);
  }

  @Put(":id")
  update(
    @Param("id") id: string,
    @Body() updateAvaliacoesDto: UpdateAvaliacoesDto
  ) {
    return this.avaliacoesService.update(+id, updateAvaliacoesDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.avaliacoesService.remove(+id);
  }
}
