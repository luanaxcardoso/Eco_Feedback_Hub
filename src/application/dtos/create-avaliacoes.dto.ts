import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsEmail, IsBoolean, IsNotEmpty, IsPositive } from 'class-validator';

export class CreateAvaliacoesDto {
  
  @ApiProperty({
    description: 'Nome da pessoa que fez a avaliação',
    example: 'Paul McCartney',
  })
  @IsString()
  @IsNotEmpty()
  readonly nome_Pessoa: string;

  @ApiProperty({
    description: 'Idade da pessoa que fez a avaliação',
    example: 82,
  })
  @IsInt()
  @IsPositive()
  readonly idade: number;

  @ApiProperty({
    description: 'Email da pessoa que fez a avaliação',
    example: 'paul@gmail.com',
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
    description: 'Produto livre de crueldade',
    example: true,
  })
  @IsBoolean()
  readonly livreDe_Crueldade: boolean;

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
    example: 2,
  })
  @IsInt()
  @IsPositive()
  readonly produto_id: number; 
}
