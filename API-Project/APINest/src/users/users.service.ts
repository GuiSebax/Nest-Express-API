import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { NotFoundException, ValidationException } from 'src/common/exceptions';
import { CreateUserDto, UserRole } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async getAllUsers() {
        return this.prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
                updatedAt: true
            }
        })
    }

    async getUserById(userId: number) {

        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
                updatedAt: true
            }

        });

        if (!user) {
            throw new NotFoundException('Usuário');
        }

        return user;
    }

    async createUser(dto: CreateUserDto) {
        // Regra de negócio: email único
        const existingUser = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });

        if (existingUser) {
            throw new ValidationException("Já existe um usuário com o email informado.");
        }

        const hashedPassword = await bcrypt.hash(dto.password, 10);

        return this.prisma.user.create({
            data: {
                email: dto.email,
                password: hashedPassword,
                name: dto.name ?? null,
                role: dto.role ?? UserRole.CUSTOMER
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
                updatedAt: true
            }
        })

    }

    async updateUser(userId: number, dto: UpdateUserDto) {

        const user = await this.prisma.user.findUnique({
            where: { id: userId }
        });

        if (!user) {
            throw new NotFoundException("Usuário");
        }

        const data: any = {};

        if (dto.name !== undefined) {
            data.name = dto.name;
        }

        if (dto.role !== undefined) {
            data.role = dto.role;
        }

        return this.prisma.user.update({
            where: { id: userId },
            data,
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
                updatedAt: true
            }
        });
    }

    async deleteUser(userId: number) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId }
        });

        if (!user) {
            throw new NotFoundException("Usuário");
        }

        return this.prisma.user.delete({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
                updatedAt: true,
            }
        });
    }
}
