import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "../../../prisma/prisma.service";

// Dado um token JWT, quem é esse usuário ? 
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(private readonly prisma: PrismaService) {
        super({
            // Isso lê ("Authorization: Bearer TOKEN")
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET || "default",
        });
    }

    // Tudo que eu retornar aqui vira req.user
    // req.user.id
    // req.user.role.....
    async validate(payload: { sub: number }) {
        const user = await this.prisma.user.findUnique({
            where: { id: payload.sub },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
            },
        });

        if (!user) {
            return null; // Nest bloqueia automaticamente
        }

        return user;
    }


}