import {
    IsEmail,
    IsOptional,
    IsString,
    MinLength,
    IsEnum,
} from "class-validator";

import { Transform } from "class-transformer";

export enum UserRole {
    ADMIN = "ADMIN",
    CUSTOMER = "CUSTOMER",
}

export class CreateUserDto {

    @IsEmail()
    @Transform(({ value }) => value.trim().toLowerCase())
    email: string;

    @IsString()
    @MinLength(6)
    password: string;

    @IsOptional()
    @IsString()
    @Transform(({ value }) => value?.trim())
    name?: string;

    @IsOptional()
    @IsEnum(UserRole)
    role?: UserRole;


}