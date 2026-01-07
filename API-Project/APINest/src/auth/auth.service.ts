import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { RegisterDto, UserRole } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from "bcryptjs";
import { JwtService } from "@nestjs/jwt";
import { ValidationException } from 'src/common/exceptions';
import { NotFoundException } from 'src/common/exceptions';


@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
    ) { }

    async register(dto: RegisterDto) {
        const existingUser = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });

        if (existingUser) {
            throw new ValidationException("Email já cadastrado");
        }

        const hashedPassword = await bcrypt.hash(dto.password, 10);

        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                password: hashedPassword,
                name: dto.name ?? null,
                role: dto.role ?? UserRole.CUSTOMER,
            },
        });

        return {
            user: this.sanitizeUser(user),
            token: this.generateToken(user.id),
        };
    }

    async login(dto: LoginDto) {
        const user = await this.prisma.user.findUnique({
            where: { email: dto.email }
        });

        if (!user) {
            throw new NotFoundException("Usuário");
        }

        const passwordValid = await bcrypt.compare(dto.password, user.password);

        if (!passwordValid) {
            throw new ValidationException("Senha inválida");
        }

        return {
            user: this.sanitizeUser(user),
            token: this.generateToken(user.id),
        };
    }

    private generateToken(userId: number) {
        return this.jwtService.sign({ sub: userId });
    }

    private sanitizeUser(user: any) {
        const { password, ...rest } = user;
        return rest;
    }

}
