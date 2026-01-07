import { NotFoundException as NestNotFoundException } from "@nestjs/common";

export class NotFoundException extends NestNotFoundException {
    constructor(resource = "Recurso") {
        super(`${resource} não encontrado`);
    }
}