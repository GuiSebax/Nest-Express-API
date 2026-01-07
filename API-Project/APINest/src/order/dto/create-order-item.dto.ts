import { Transform } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class CreateOrderItemDto {
    @IsInt()
    @Min(1)
    @Transform(({ value }) => Number(value))
    productId: number;

    @IsInt()
    @Min(1)
    @Transform(({ value }) => Number(value))
    quantity: number;
}
