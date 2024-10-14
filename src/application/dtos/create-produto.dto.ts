import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class CreateProdutoDto {
    
    @ApiProperty({
        description: 'Nome do produto',
        example: 'Hamburguer de soja',
      })
    @IsNotEmpty()
    @IsString()
    readonly nome: string;

    @ApiProperty({
        description: 'Marca do produto',
        example: 'Futuro Burguer',
      })
    @IsNotEmpty()
    @IsString()
    readonly marca: string;

    @ApiProperty({
        description: 'Preço do produto',
        example: '20.00',
     })
    @IsNumber()
    @IsPositive()
    readonly preco: number;

    @ApiProperty({
        description: 'Quantidade do produto',
        example: 6,
    })
    @IsNumber()
    readonly quantidade: number;
}
