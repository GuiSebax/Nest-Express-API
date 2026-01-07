import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { NotFoundException, ValidationException } from 'src/common/exceptions';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressService {
    constructor(private readonly prisma: PrismaService) { }

    async getAllAddresses() {
        return this.prisma.address.findMany();
    }

    async getAllAddressesByUserId(userId: number) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            throw new NotFoundException("Usuário");
        }

        return this.prisma.address.findMany({
            where: { userId: userId }
        });
    }

    async getAddressById(addressId: number) {
        const address = await this.prisma.address.findUnique({
            where: { id: addressId }
        });

        if (!address) {
            throw new NotFoundException("Endereço");
        }

        return address;
    }

    async createAddress(dto: CreateAddressDto) {
        const userExists = await this.prisma.user.findUnique({
            where: { id: dto.userId }
        });

        if (!userExists) {
            throw new NotFoundException("Usuário");
        }

        return this.prisma.address.create({
            data: {
                userId: dto.userId,
                street: dto.street,
                city: dto.city,
                state: dto.state,
                country: dto.country,
                zipCode: dto?.zipCode || null
            }
        });
    }

    async updateAddress(addressId: number, dto: UpdateAddressDto) {
        const existing = await this.prisma.address.findUnique({
            where: { id: addressId },
        });

        const data: any = {};

        if (!existing) {
            throw new NotFoundException("Endereço");
        }

        if (dto.street !== undefined) {
            data.street = dto.street;
        }

        if (dto.city !== undefined) {
            data.city = dto.city;
        }

        if (dto.state !== undefined) {
            data.state = dto.state;
        }

        if (dto.country !== undefined) {
            data.country = dto.country;
        }

        if (dto.zipCode !== undefined) {
            data.zipCode = dto.zipCode;
        }

        return this.prisma.address.update({
            where: { id: addressId },
            data
        });
    }

    async deleteAddress(addressId: number) {
        const existing = await this.prisma.address.findUnique({
            where: { id: addressId },
        });

        if (!existing) {
            throw new NotFoundException(`Endereço ${addressId}`);
        }

        // Verificar se o endereço está vinculado a pedidos
        const addressUserInOrders = await this.prisma.order.findFirst({
            where: { userId: existing.userId }
        });

        if (addressUserInOrders) {
            throw new ValidationException("Não é possível excluir um endereço vinculado a um pedido.");
        }

        return this.prisma.address.delete({
            where: { id: addressId }
        });
    }

}
