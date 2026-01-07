import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

// Ele usa automaticamente a JwtStrategy
// "Essa rota exige token válido?"
@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") { }