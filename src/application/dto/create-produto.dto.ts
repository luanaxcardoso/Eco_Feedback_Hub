import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class CreateProdutoDto {
    
    @IsNotEmpty()
    @IsString()
    nome: string;

    @IsNotEmpty()
    @IsString()
    marca: string;

    @IsNumber()
    @IsPositive()
    preco: number;

    @IsNumber()
    quantidade: number;
}
