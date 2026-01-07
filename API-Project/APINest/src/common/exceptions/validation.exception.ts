import { BadRequestException } from "@nestjs/common";

export class ValidationException extends BadRequestException {
    constructor(message: string) {
        super(message);
    }
}

// Responde status 400 body padrão