import { Transform, Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsInt, IsPositive, ValidateNested } from "class-validator";
import { CreateOrderItemDto } from "./create-order-item.dto";

export class CreateOrderDto {

    @IsInt()
    @IsPositive()
    @Transform(({ value }) => Number(value))
    userId: number;

    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => CreateOrderItemDto)
    items: CreateOrderItemDto[]

}

// validateNested serve para:
// Validar cada objeto dentro de items usando as regras do CreateOrderItemDto

// type faz isso:
// Quando transformar o request, converta cada item de items para uma instância de createOrderItemDto