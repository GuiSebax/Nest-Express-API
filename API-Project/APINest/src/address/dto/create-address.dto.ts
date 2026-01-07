import { Transform } from "class-transformer";
import { IsInt, IsNotEmpty, IsOptional, IsPositive, IsString } from "class-validator";


export class CreateAddressDto {

    @IsInt()
    @IsPositive()
    @Transform(({ value }) => Number(value))
    userId: number;

    @IsString()
    @IsNotEmpty({ message: 'Rua é obrigatória' })
    @Transform(({ value }) => value.trim())
    street: string;

    @IsString()
    @IsNotEmpty({ message: 'Cidade é obrigatório' })
    @Transform(({ value }) => value.trim())
    city: string;

    @IsString()
    @IsNotEmpty({ message: 'Estado é obrigatório' })
    @Transform(({ value }) => value.trim())
    state: string;

    @IsString()
    @IsNotEmpty({ message: 'País é obrigatório' })
    @Transform(({ value }) => value.trim())
    country: string;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value?.trim())
    zipCode?: string;




}