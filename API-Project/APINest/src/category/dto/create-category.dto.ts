import { Transform } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {

    @IsString()
    @Transform(({ value }) => value.trim())
    @IsNotEmpty({ message: 'O campo "Nome" é obrigatório' })
    name: string;
}