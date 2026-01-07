import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';

// Todas as rotas precisam do token
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {

    constructor(private readonly service: UsersService) { }

    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Get()
    getAllUsersHandler() {
        return this.service.getAllUsers();
    }

    // Só essa rota precisam do authToken
    // @UseGuards(JwtAuthGuard)
    @Get(':id')
    getUserByIdHandler(@Param("id", ParseIntPipe) id: number) {
        return this.service.getUserById(id);
    }

    @Post()
    createUserHandler(@Body() dto: CreateUserDto) {
        return this.service.createUser(dto);
    }

    @Patch(':id')
    updateUserHandler(
        @Param("id", ParseIntPipe) id: number,
        @Body() dto: UpdateUserDto) {

        return this.service.updateUser(id, dto);
    }

    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Delete(':id')
    deleteUserHandler(@Param("id", ParseIntPipe) id: number) {
        return this.service.deleteUser(id);
    }


}

// Ou você pode configurar o app.module.ts para que TODA a api seja necesário
// o uso do token 