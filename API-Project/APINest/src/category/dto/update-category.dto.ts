import { Transform } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateCategoryDto {

    @IsOptional()
    @IsString()
    @IsNotEmpty({ message: 'O campo "nome" é obrigatório.' })
    @Transform(({ value }) => value?.trim())
    name?: string;
}