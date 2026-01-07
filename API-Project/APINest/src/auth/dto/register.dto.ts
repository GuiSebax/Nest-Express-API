import { Transform } from "class-transformer";
import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from "class-validator";

export enum UserRole {
    ADMIN = "ADMIN",
    CUSTOMER = "CUSTOMER",
}

export class RegisterDto {

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