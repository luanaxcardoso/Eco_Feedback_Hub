import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsEmail, IsBoolean, IsNotEmpty, IsPositive } from 'class-validator';

export class CreateAvaliacoesDto {
  
  @ApiProperty({
    description: 'Nome da pessoa que fez a avaliação',
    example: 'Ada lovelace',
  })
  @IsString()
  @IsNotEmpty()
  readonly nome_Pessoa: string;

  @ApiProperty({
    description: 'Idade da pessoa que fez a avaliação',
    example: 42,
  })
  @IsInt()
  @IsPositive()
  readonly idade: number;

  @ApiProperty({
    description: 'Email da pessoa que fez a avaliação',
    example: 'love@gmail.com',
  })
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    description: 'Nota da avaliação de 1 a 5',
    example: '5',
  })
  @IsString()
  @IsNotEmpty()
  readonly nota: string;

  @ApiProperty({
    description: 'Comentário da avaliação',
    example: 'Produto de ótima qualidade!',
  })
  @IsString()
  @IsNotEmpty()
  readonly comentario: string;

  @ApiProperty({
    description: 'Produto de origem animal',
    example: false,
  })
  @IsBoolean()
  readonly origem_Animal: boolean;

  @ApiProperty({
    description: 'Produto de origem vegetal',
    example: true,
  })
  @IsBoolean()
  readonly origem_Vegetal: boolean;

  
  @ApiProperty({
    description: 'Embalagem reciclável',
    example: true,
  })
  @IsBoolean()
  readonly embalagem_Reciclavel: boolean;

  @ApiProperty({
    description: 'Produto nacional',
    example: true,
  })
  @IsBoolean()
  readonly nacional: boolean;

  @ApiProperty({
    description: 'ID do produto',
    example: 1,
  })
  @IsInt()
  @IsPositive()
  readonly produto_id: number; 

  constructor(partial: Partial<CreateAvaliacoesDto>) {
    Object.assign(this, partial);
  }
}
