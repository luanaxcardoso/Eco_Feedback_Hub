import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class CreateProdutoDto {
    
    @IsNotEmpty()
    @IsString()
    readonly nome: string;

    @IsNotEmpty()
    @IsString()
    readonly marca: string;

    @IsNumber()
    @IsPositive()
    readonly preco: number;

    @IsNumber()
    readonly quantidade: number;
}
