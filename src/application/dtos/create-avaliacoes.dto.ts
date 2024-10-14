import { IsString, IsInt, IsEmail, IsBoolean, IsNotEmpty, IsPositive } from 'class-validator';

export class CreateAvaliacoesDto {
  
  @IsString()
  @IsNotEmpty()
  readonly nome_Pessoa: string;

  @IsInt()
  @IsPositive()
  readonly idade: number;

  @IsEmail()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly nota: string;

  @IsString()
  @IsNotEmpty()
  readonly comentario: string;

  @IsBoolean()
  readonly origem_Animal: boolean;

  @IsBoolean()
  readonly origem_Vegetal: boolean;

  @IsBoolean()
  readonly livreDe_Crueldade: boolean;

  @IsBoolean()
  readonly embalagem_Reciclavel: boolean;

  @IsBoolean()
  readonly nacional: boolean;

  @IsInt()
  @IsPositive()
  readonly produto_id: number; 
}
