import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { AvaliacoesService } from "./avaliacoes.service";
import { CreateAvaliacoesDto } from "./dto/create-avaliacoes.dto";
import { UpdateAvaliacoesDto } from "./dto/update-avaliacoes.dto";

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

  @Patch(":id")
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
