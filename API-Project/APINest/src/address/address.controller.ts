import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@UseGuards(JwtAuthGuard)
@Controller('address')
export class AddressController {
    constructor(private readonly service: AddressService) { }

    @Get()
    getAllAddressesHandler() {
        return this.service.getAllAddresses();
    }

    @Get(':id')
    getAllAddressesByUserIdHandler(@Param('id', ParseIntPipe) userId: number) {
        return this.service.getAllAddressesByUserId(userId);
    }

    @Get(':id')
    getAddressByIdHandler(@Param('id', ParseIntPipe) addressId: number) {
        return this.service.getAddressById(addressId);
    }

    @Post()
    createAddressHandler(@Body() dto: CreateAddressDto) {
        return this.service.createAddress(dto);
    }

    @Patch(':id')
    updateAddressHandler(@Param('id', ParseIntPipe) addressId: number, @Body() dto: UpdateAddressDto) {
        return this.service.updateAddress(addressId, dto);
    }

    @Delete(':id')
    deleteAddressHandler(@Param('id', ParseIntPipe) addressId: number) {
        return this.service.deleteAddress(addressId);
    }
}
