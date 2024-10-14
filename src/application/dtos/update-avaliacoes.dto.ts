import { PartialType } from "@nestjs/swagger";
import { CreateAvaliacoesDto } from "./create-avaliacoes.dto";

export class UpdateAvaliacoesDto extends PartialType(CreateAvaliacoesDto) {}
