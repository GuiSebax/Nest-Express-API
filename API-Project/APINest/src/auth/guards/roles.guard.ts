// Verifica se o usuário autenticado tem permissão

import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "../decorators/roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        // Lê as roles exigidas da rota
        const requiredRoles = this.reflector.getAllAndOverride<string[]>(
            ROLES_KEY,
            [
                context.getHandler(), // método
                context.getClass, // controller
            ],
        );

        // Se não exigir role -> libera
        if (!requiredRoles || requiredRoles.length === 0) {
            return true;
        }

        // Pega o usuário autenticado
        const request = context.switchToHttp().getRequest();
        const user = request.user;

        // Verifica se o usuário tem a role
        return requiredRoles.includes(user.role);
    }
}

// O que acontece aqui (passo a passo)
/*
1 - @Roles("ADMIN") salva metadata
2 - RolesGuard lê essa metadata
3 - Pega req.user (vem da JwtStrategy)
4 - Compara user.role
5 - Libera ou bloqueia

Isso acontece antes do controller rodar 

Request
 → JwtAuthGuard (quem é?)
   → JwtStrategy
     → req.user
 → RolesGuard (pode?)
 → Controller
 → Service

*/