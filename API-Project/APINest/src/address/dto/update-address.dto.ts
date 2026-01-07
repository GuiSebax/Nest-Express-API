import { IsString, IsNotEmpty, IsOptional } from "class-validator";
import { Transform } from "class-transformer";

export class UpdateAddressDto {

    @IsOptional()
    @IsString()
    @IsNotEmpty({ message: "Rua não pode ser vazia." })
    @Transform(({ value }) => value.trim())
    street?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty({ message: "Cidade não pode ser vazia." })
    @Transform(({ value }) => value.trim())
    city?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty({ message: "Estado não pode ser vazio." })
    @Transform(({ value }) => value.trim())
    state?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty({ message: "País não pode ser vazio." })
    @Transform(({ value }) => value.trim())
    country?: string;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => {
        const trimmed = value?.trim();
        return trimmed === "" ? null : trimmed;
    })
    zipCode?: string | null;
}