import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class UpdateProductDto {

    @IsOptional()
    @IsString()
    @IsNotEmpty({ message: "O nome não pode ser vazio." })
    @Transform(({ value }) => value.trim())
    name?: string;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => {
        const trimmed = value?.trim();
        return trimmed === "" ? null : trimmed;
    })
    description?: string | null;

    @IsOptional()
    @IsNumber(
        { maxDecimalPlaces: 2 }
    )
    @Min(0, { message: 'O campo "preço" não pode ser negativo' })
    @Transform(({ value }) => Number(value))
    price?: number;

}