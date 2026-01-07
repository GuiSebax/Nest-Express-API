import { Transform } from "class-transformer";
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Min } from "class-validator";

export class CreateProductDto {

    @IsString()
    @IsNotEmpty({ message: 'O campo "nome" é obrigatório.' })
    @Transform(({ value }) => value.trim())
    name: string;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value?.trim())
    description?: string;

    @IsNumber(
        { maxDecimalPlaces: 2 },
        { message: 'O campo "preço" deve ser um número válido.' }
    )
    @Min(0, { message: 'O campo "preço" não pode ser negativo.' })
    @Transform(({ value }) => Number(value))
    price: number;
}