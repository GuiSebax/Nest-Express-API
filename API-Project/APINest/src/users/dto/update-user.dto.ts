import { Transform } from "class-transformer";
import { IsEnum, IsOptional, IsString } from "class-validator";
import { UserRole } from "./create-user.dto";


export class UpdateUserDto {

    @IsString()
    @IsOptional()
    @Transform(({ value }) => value?.trim())
    name?: string;

    @IsOptional()
    @IsEnum(UserRole)
    role?: UserRole

}