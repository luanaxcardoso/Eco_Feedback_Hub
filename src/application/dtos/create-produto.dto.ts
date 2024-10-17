import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";
import { CategoriaProduto } from "src/domain/enum/categoria-produto.enum";

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

    @ApiProperty({
      description: 'Categorias dos produtos: Alimento, Bebida, Limpeza, Cosmetico, Outro.',
      examples: [CategoriaProduto.ALIMENTO, CategoriaProduto.BEBIDA, CategoriaProduto.LIMPEZA, CategoriaProduto.COSMETICO, CategoriaProduto.OUTRO],

      enum: CategoriaProduto, 
    })
    @IsEnum(CategoriaProduto) 
    readonly categoria: CategoriaProduto;

    constructor(partial: Partial<CreateProdutoDto>) {
      Object.assign(this, partial);
    }
}
