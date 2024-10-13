import { PartialType } from "@nestjs/mapped-types";
import { CreateAvaliacoesDto } from "./create-avaliacoes.dto";

export class UpdateAvaliacoesDto extends PartialType(CreateAvaliacoesDto) {}
